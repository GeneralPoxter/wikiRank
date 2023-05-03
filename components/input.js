import React from "react";
import { useState } from "react";
import { getDocumentRanks } from "../lib/vector_model.js";
import wiki from "wikijs";

export default function Input() {
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

        const keywordsList = keywords.split(",");
        if (keywordsList.length == 0) {
            return;
        }

        const res = await Promise.all(
            keywordsList.map(async keyword => await wiki().search(keyword, 5, true).then(data => data.results))
        );

        const articles = await Promise.all(
            res.flat().map(async a => {
                console.log("finding....");
                const page = await wiki().findById(a.pageid);

                return {
                    title: a.title,
                    summary: await page.summary(),
                    text: await page.rawContent(),
                    image: await page.mainImage(),
                    url: page.url()
                };
            })
        );

        setRanks(getDocumentRanks(articles, query));
    }

    return (
        <div className="mx-[5%] bg-[#181825] p-8 rounded-xl text-center">
            <p className="text-[150%] text-bold text-[#cdd6f4] text-left">Paste your article in the box below.</p>
            <textarea
                className="overflow-scroll bg-[#807e91] text-[#cdd6f4] w-[100%] text-left h-[15em] bg-opacity-50 text-[150%]"
                value={query}
                onChange={handleQuery}
            />
            <p className="text-[#cdd6f4]">You typed: {query}</p>
            <p className="text-2xl text-left text-[#cdd6f4]">Insert keywords below: </p>
            <textarea
                className="overflow-scroll bg-[#807e91] text-[#cdd6f4] w-[100%] text-left h-[1%] bg-opacity-50 text-[150%]"
                value={keywords}
                onChange={handleKeywords}
            />
            <p className="text-[#cdd6f4]">You typed: {keywords}</p>
            <button className="text-[#cdd6f4]" onClick={fetchArticles}>
                Penis
            </button>
        </div>
    )
}
