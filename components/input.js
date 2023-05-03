import React from "react";
import { useState } from "react";
import { getDocumentRanks } from "../lib/vector_model.js";
import wiki from "wikijs";

export default function Input() {
    const NUM_DOCS = 5;
    const [query, setQuery] = useState('');
    const [keywords, setKeywords] = useState('');
    const [ranks, setRanks] = useState([]);

    function handleQuery(e) {
        setQuery(e.target.value);
    }

    function handleKeywords(e) {
        setKeywords(e.target.value);
    }

    async function fetchArticles(e) {
        e.preventDefault();

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
                    <div className='text-left'>
                        <a href={article.url} className='text-[200%] text-bold text-white'>
                            {article.title}
                        </a>
                        <div className='mb-10 text-white bg-[grey] 
                            p-5 rounded-xl bg-opacity-40 flex items-center justify-center'>
                            <div className="w-[50%]">
                                <div className='overflow-scroll h-[300px]'>
                                    <p>{article.summary}</p>
                                    <p>{score}</p>
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
                <div className='text-left mb-10 text-white bg-[grey] 
                    p-5 rounded-xl bg-opacity-40 flex items-center justify-center'>
                    <h1>No relevant articles found</h1>
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
            <p className="text-[2em] m-[1em] text-[#cdd6f4] text-center">Paste your article, document, whatever, in the box below.</p>
            <textarea
                className="overflow-scroll rounded-xl bg-[#313244] text-[#cdd6f4] w-[100%] text-left h-[15em] text-[150%]"
                value={query}
                onChange={handleQuery}
            />
            <p className="text-[2em] m-[1em] text-center text-[#cdd6f4]">Insert some keywords below.</p>
            <textarea
                className="overflow-scroll rounded-xl bg-[#313244] text-[#cdd6f4] w-[100%] text-left h-[1%] text-[150%]"
                value={keywords}
                onChange={handleKeywords}
            />

            <button
                className="bg-[#b4befe] m-[1em] px-[0.6em] py-[0.4em] text-[200%] rounded-lg text-[#181825] hover:bg-[#929de7]"
                onClick={fetchArticles}
            >
                Rank it!
            </button>

            <div className="w-[100%] bottom-[100px] rounded-xl bg-[#313244]">
                <div className="mb-2 mt-2">
                    <h className="text-[3em] text-[#cdd6f4]">Results:</h>
                </div>
                <div className="ml-[5%] mr-[5%] mb-10 p-4">
                    <div className="ml-5 mr-5">
                    </div>
                    <div className="ml-[5%] mr-[5%] mb-10 p-4">
                        <div className="ml-5 mr-5">
                            {displayResults()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
