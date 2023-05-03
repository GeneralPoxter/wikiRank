import React, { Component } from "react";

export default function About() {
    const divtext = [
        "About SwapWikiMachine, Can't understand a journal article? Feeling lost in a textbook chapter? Wikipedia is your friend -- but it's so big! SwapWikiMachine determines the most relevant Wikipedia pages to your text using the vector space model. Happy studying!",
        "Instructions, ",
        "Vector Space Model, Each document is represented by a vector, where each component corresponds to a term and its tf-idf weight.",
    ];

    const swag = divtext?.map((item, i) => {
        const contents = item.split(",");
        return (
            <div>
                <div className='text-[350%] font-bold w-auto'>
                    <h1>{contents[0]}</h1>
                </div>
                <div className='text-left bg-white p-4 mb-2 bg-opacity-85 text-black'>
                    <p>{contents[1]}</p>
                </div>
            </div>
        );
    });

    return (
        <div className='h-screen bg-gradient-to-r from-blue-900 to-purple-900'>
            <div className='relative top-[10px] mb-10 text-blue-200 p-3 w-[50%] ml-auto mr-auto bg-black bg-opacity-60 shadow-lg shadow-black'>
                <h1 className='font-bold text-[350%] text-center'>About Us</h1>
                <img src='images/jason.jpg' className='ml-auto mr-auto max-w-[400%] transition duration-300 ease-in-out hover:shadow-lg hover:shadow-white'
                    alt='our beloved founder' />
                <br />
                <p className='mt-2'>evolution is banned in schools in the south</p>
                <br />
                {swag}
            </div>
        </div >
    )
}

/*
<h1>About SwapWikiMachine</h1>
<p>Can't understand a journal article? Feeling lost in a textbook chapter? Wikipedia is your friend -- but it's so big!
    SwapWikiMachine determines the most relevant Wikipedia pages to your text using the vector space model. Happy studying!
</p>

<h1>Instructions</h1>
<p></p>

<h1>Vector space model</h1>
Each document is represented by a vector, where each component corresponds to a term and its tf-idf weight.
*/