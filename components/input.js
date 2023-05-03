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
                    image: await page.mainImage().catch(_ => undefined),
                    categories: await page.categories().catch(_ => []),
                    url: page.url()
                };
            })
        );

        const filteredArticles = articles
            .filter((v, i, a) => a.findIndex(v2 => (v2.title === v.title)) === i)
            .filter((v, _) => !v.categories.includes("Category:Disambiguation pages"));

        setRanks(getDocumentRanks(filteredArticles, query));
    }

    function displayResults() {
        var items = [];

        for (const entry of ranks) {
            const article = entry[0].wikidoc;
            const score = entry[1];

            if (score > 0) {
                items.push(
                    <div>
                        <div className="text-[200%] text-[#cdd6f4] flex justify-between">
                            <div>
                                <a href={article.url} target='_blank' className='underline text-[#89b4fa]'>
                                    {article.title}
                                </a>
                            </div>
                            <div className="font-mono">Score: <span className="italic">{Math.round(score * 10 ** 10) / 10 ** 10}</span></div>
                        </div>
                        <div className='mt-[1em] mb-[3em] text-[#cdd6f4] bg-[#45475a] p-[2em] rounded-xl flex justify-stretch'>
                            <div className="overflow-scroll text-[140%] text-left w-2/3 h-[300px]">
                                {article.summary}
                            </div>
                            <div className="grow flex justify-center items-center">
                                {
                                    article.image !== undefined ?
                                        <a href={article.url} target="_blank">
                                            <img
                                                src={article.image}
                                                className="object-contain h-[15em] w-[15em] 
                                            rounded-xl transition duration-300 ease-in-out hover:scale-110"
                                            />
                                        </a>
                                        :
                                        <div className="text-[1.5em]">Image not available.</div>
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
            <p className="text-[2em] text-[#cdd6f4] text-center">Text to parse</p>
            <textarea
                className="overflow-scroll mt-[1em] p-[1em] rounded-xl bg-[#313244] text-[#cdd6f4] w-[100%] text-left h-[15em]"
                placeholder="Paste your article, document, whatever, in this box"
                ref={queryTextArea}
            />
            <p className="text-[2em] mt-[1em] text-center text-[#cdd6f4]">Searchable keywords</p>
            <textarea
                className="overflow-scroll mt-[1em] p-[1em] rounded-xl bg-[#313244] text-[#cdd6f4] w-[100%] text-left h-[5em]"
                placeholder="comma, separated, keywords"
                ref={keywordsTextArea}
            />
            <button
                className="bg-[#b4befe] my-[1.5em] px-[1em] py-[0.4em] text-[200%] rounded-lg text-[#181825] transition duration-300 ease-in-out hover:bg-[#929de7]"
                onClick={fetchArticles}
            >
                Rank it!
            </button>
            <div>
                <h className="text-[4em] text-[#cdd6f4]">Results</h>
                <div className="w-[100%] my-[1.5em] p-[3em] rounded-xl bg-[#313244]">
                    {displayResults()}
                </div>
            </div>
        </div>
    )
}
