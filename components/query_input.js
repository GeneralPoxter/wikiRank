import React, { Component } from "react";
import wiki from "wikijs";

export default class query_input extends Component {
    constructor() {
        super();
        this.state = {
            textAreaValue: "",
            show: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange() {
        this.setState({
            textAreaValue: event.target.value,
        })
    }

    async handleSubmit() {
        const content = await wiki().page(this.state.textAreaValue).then(page => page.rawContent());

        alert('search entry: ' + this.state.textAreaValue + " and content: " + content);

        this.setState({ show: true })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div className='top-[10em] ml-[10%] mr-[10%] bg-blue-200 p-8 rounded-xl bg-opacity-60'>
                    <form onSubmit={this.handleSubmit}>
                        <label className='text-left'>
                            <p className="text-[150%] text-bold text-black">Put your stuff in here: </p>
                            <textarea className='overflow-scroll bg-white w-[100%] text-left
                            h-[400px] mt-2 bg-opacity-50 text-[150%]'
                                id="query"
                                value={this.state.textAreaValue}
                                onChange={this.handleChange}
                            />
                            <p className="text-2xl">Insert keywords below: </p>
<<<<<<< HEAD:components/query_input.js
                            <div className="input-area w-[100%]" id="keywords">
                                <input type="text" id="key-input" className="w-[100%]" />
=======
                            <div id="keywords" className="input-area w-[100%]">
                                <input type="text" id="key-input" className="w-[100%]"/>
>>>>>>> main:pages/query_input.js
                            </div>
                        </label>
                        <button type="submit" value="Submit" className='align-center bg-green-400 p-10 rounded-xl
                        mt-5 bg-opacity-90'>PUSH!</button>
                    </form>
                </div>
            </div>
        )
    }
}
