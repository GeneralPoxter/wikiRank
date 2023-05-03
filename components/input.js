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

        if (query.length == 0 || keywords.length == 0) {
            alert("One or more of the fields are empty!");
            return;
        }

        const results = await Promise.all(
            keywords.split(",").map(async keyword =>
                await wiki().search(keyword, NUM_DOCS, true).then(data => data.results)
            )
        );

        const articles = await Promise.all(
            results.flat().map(async article => {
                const page = await wiki().findById(article.pageid);

                return {
                    title: article.title,
                    summary: await page.summary(),
                    text: await page.rawContent(),
                    image: await page.mainImage(),
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
                        <div className="text-[200%] text-[#cdd6f4] flex justify-between">
                            <div>
                                <a href={article.url} target='_target' className='underline text-[#89b4fa]'>
                                    {article.title}
                                </a>
                            </div>
                            <div className="font-mono italic">{score}</div>
                        </div>

                        <div className='mt-[1em] mb-[3em] text-[#cdd6f4] bg-[#585b70] 
                            p-[2em] rounded-xl flex justify-center'>
                            <div className="w-[50%]">
                                <div className='overflow-scroll h-[300px] text-[#cdd6f4]'>
                                    <p>{article.summary}</p>
                                </div>
                            </div>
                            <div
                                className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat ml-8"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                <img
                                    src={article.image}
                                    className="max-h-[15em] w-auto"
                                />
                                <a href={article.url}>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                </a>
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
