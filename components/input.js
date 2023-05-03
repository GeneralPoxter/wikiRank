import React, { Component } from "react";
import wiki from "wikijs";
import { getDocumentRanks, testSwapneel } from "./model.js";

export default class Input extends Component {
    constructor() {
        super();

        this.state = {
            textAreaValue: "",
            keywords: "",
            show: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e) {
        this.setState({
            textAreaValue: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.setState({ show: true })

        // Check whether keywords is length 0
        const query = this.state.textAreaValue;
        const keywords = this.state.keywords.split(",");
        console.log(keywords);
        const res = await Promise.all(
            keywords.map(async keyword => await wiki().search(keyword, 5, true).then(data => data.results))
        );
        const articles = await Promise.all(
            res.map(async a => {
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

        const ranks = getDocumentRanks(articles, "These types of sausages were culturally imported from Germany and became popular in the United States. It became a working-class street food in the U.S., sold at stands and carts. The hot dog became closely associated with baseball and American culture. Although particularly connected with New York City and its cuisine, the hot dog eventually became ubiquitous throughout the US during the 20th century. Its preparation varies regionally in the country, emerging as an important part of other regional cuisines, including Chicago street cuisine");
        console.log(ranks);
    }

    render() {
        return (
            <div>
                <div className="mx-[5%] bg-[#181825] p-8 rounded-xl text-center">
                    <form onSubmit={this.handleSubmit}>
                        <p className="text-[150%] text-bold text-[#cdd6f4] text-left">Paste your article in the box below.</p>
                        <textarea
                            className="overflow-scroll bg-[#807e91] text-[#cdd6f4] w-[100%] text-left h-[400px] bg-opacity-50 text-[150%]"
                            id="query"
                            value={this.state.textAreaValue}
                            onChange={this.handleChange}
                        />
                        <p className="text-2xl text-left text-[#cdd6f4]">Insert keywords below: </p>
                        <div className="input-area w-[100%]" id="keywords">
                            <input type="text" id="key-input" value={this.state.keywords}
                                className="w-[100%] bg-[#807e91] bg-opacity-50 text-[#cdd6f4]" />
                        </div>
                        <button
                            type="submit"
                            value="Submit"
                            className='align-center bg-[#b4befe] 
                            p-10 rounded-xl mt-4 bg-opacity-90'>
                            Analyze
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
