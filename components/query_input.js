import React, { Component } from "react";
import wiki from "wikijs";
import { parseDocument, createCorpus, getDocumentRanks, testSwapneel } from "./model.js";

export default class query_input extends Component {
    constructor() {
        super();

        this.state = {
            textAreaValue: "",
            keywords: "",
            show: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        testSwapneel();
    };

    handleChange(e) {
        this.setState({
            textAreaValue: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ show: true })

        const query = await wiki().search(this.state.textAreaValue, 20, true).then(data => data.results);
        const articles = [];

        for (const a of query) {
            console.log("finding....");
            const page = await wiki().findById(a.pageid);

            articles.push({
                title: a.title,
                summary: await page.summary(),
                text: await page.rawContent(),
                image: await page.mainImage(),
                url: page.url()
            });
        }

        console.log(articles);
    }

    render() {
        return (
            <div>
                <div className='top-[10em] ml-[10%] mr-[10%] bg-blue-200 p-8 rounded-xl bg-opacity-60'>
                    <form onSubmit={this.handleSubmit}>
                        <p className="text-[150%] text-bold text-black text-left">Put your stuff in here: </p>
                        <textarea className='overflow-scroll bg-white w-[100%] text-left
                        h-[400px] bg-opacity-50 text-[150%]'
                            id="query"
                            value={this.state.textAreaValue}
                            onChange={this.handleChange}
                        />
                        <p className="text-2xl text-left">Insert keywords below: </p>
                        <div className="input-area w-[100%]" id="keywords">
                            <input type="text" id="key-input" defaultValue={this.state.keywords} className="w-[100%]" />
                        </div>
                        <button type="submit" value="Submit" className='align-center bg-green-400 p-10 rounded-xl
                        mt-4 bg-opacity-90'>PUSH!</button>
                    </form>
                </div>
            </div>
        )
    }
}
