import React from "react";
import { useRef, useState } from "react";
import { getDocumentRanks } from "../lib/vector_model.js";
import wiki from "wikijs";

export default function Input() {
    const NUM_DOCS = 5;
    const queryTextArea = useRef('');
    const keywordsTextArea = useRef('');
    const [ranks, setRanks] = useState([]);

    async function fetchArticles(e) {
        e.preventDefault();

        const query = queryTextArea.current?.value;
        const keywords = keywordsTextArea.current?.value;
        const wikiAPI = wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' });

        if (query.length == 0 || keywords.length == 0) {
            alert("One or more of the fields are empty!");
            return;
        }

        const results = await Promise.all(
            keywords.split(",").map(async keyword =>
                await wikiAPI.search(keyword, NUM_DOCS, true).then(data => data.results)
            )
        );

        const articles = await Promise.all(
            results.flat().map(async article => {
                const page = await wikiAPI.findById(article.pageid);
                return {
                    title: article.title,
                    summary: await page.summary().catch(_ => "Summary not found"),
                    text: await page.rawContent().catch(_ => ""),
                    image: await page.mainImage().catch(_ => ""),
                    url: page.url()
                };
            })
        );

        setRanks(getDocumentRanks(articles, query));
    }

    function displayResults() {
        var items = [];

        for (const entry of ranks) {
            const article = entry[0].wikidoc;
            const score = entry[1];

            if (score > 0) {
                items.push(
                    <div>
                        <div className="text-[200%] text-[#cdd6f4] flex justify-between items-end">
                            <div>
                                <a href={article.url} target='_blank' className='underline text-[#89b4fa]'>
                                    {article.title}
                                </a>
                            </div>
                            <div className="text-base font-mono">Rank score: <span className="italic">{Math.round(score * 10 ** 10) / 10 ** 10}</span></div>
                        </div>

                        <div className='mt-[1em] mb-[3em] text-[#cdd6f4] bg-[#585b70] p-[2em] rounded-xl flex justify-stretch'>
                            <div className="overflow-scroll text-[1.3em] text-left w-2/3 h-[300px] text-[#cdd6f4]">
                                {article.summary}
                            </div>
                            <div className="grow flex justify-center items-center">
                                {article.image.length > 0 &&
                                    <a href={article.url} target="_blank">
                                        <img
                                            src={article.image}
                                            className="object-contain h-[15em] w-[15em] rounded-xl"
                                        />
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                );
            }
        }

        if (items.length == 0) {
            items.push(
                <div
                    className='text-center text-[#cdd6f4] text-[1.5em] bg-[#45475a] p-[1.5em] rounded-xl'>
                    No relevant articles found.
                </div>
            )
        }

        return (
            <>
                {items}
            </>
        );
    }

    return (
        <div className="mx-[5%] bg-[#181825] p-[3em] rounded-xl text-center">
            <p className="text-[2em] mb-[1em] text-[#cdd6f4] text-center">Paste your article, document, whatever, in the box below.</p>
            <textarea
                className="overflow-scroll p-[1em] rounded-xl bg-[#313244] text-[#cdd6f4] w-[100%] text-left h-[15em] text-[150%]"
                ref={queryTextArea}
            />
            <p className="text-[2em] my-[1em] text-center text-[#cdd6f4]">Insert some keywords below.</p>
            <textarea
                className="overflow-scroll p-[1em] rounded-xl bg-[#313244] text-[#cdd6f4] w-[100%] text-left h-[5em] text-[150%]"
                ref={keywordsTextArea}
            />
            <button
                className="bg-[#b4befe] my-[1.5em] px-[1em] py-[0.4em] text-[200%] rounded-lg text-[#181825] hover:bg-[#929de7]"
                onClick={fetchArticles}
            >
                Rank it!
            </button>
            <div>
                <h className="text-[3em] text-[#cdd6f4]">Here are your results.</h>
                <div className="w-[100%] my-[1.5em] p-[5em] rounded-xl bg-[#313244]">
                    {displayResults()}
                </div>
            </div>
        </div>
    )
}
