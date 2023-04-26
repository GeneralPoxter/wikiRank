import React, { Component } from "react";

class query_input extends Component{
    constructor() {
        super();
        this.state = {
            textAreaValue:  ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e) {
        this.setState({ textAreaValue: event.target.value})
    }
    
    handleSubmit(e) {
        alert('hello: ' + this.state.textAreaValue);
        event.preventDefault();
    }


    render(){
        return (
            <div>
                <div className='top-[40em] ml-[10%] mr-[10%] 
                text-2xl font-bold bg-slate-400 p-8 rounded-xl bg-opacity-20'>
                    <form onSubmit={this.handleSubmit}>
                        <label className='text-left'>
                            Put your stuff in here:
                            <textarea className='overflow-scroll bg-white w-[100%] text-left
                            h-[400px] mt-2' 
                            id="query"
                                value={this.state.textAreaValue}
                                onChange={this.handleChange}
                            />
                        </label>
                        <button type="submit" value="Submit" className='align-center bg-green-400 p-10 rounded-xl
                        mt-5'>push</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default query_input;