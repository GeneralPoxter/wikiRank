import React, { Component } from "react";
import Navbar from './navbar.js';

export default function About() {
    return (
        <div className='text-center bg-gradient-to-r from-blue-900 to-purple-900 min-height-[100%]'>
            <Navbar></Navbar>
            <div className='relative top-[10px] p-3 w-[50%] ml-auto mr-auto bg-black bg-opacity-60 shadow-lg shadow-black'>
                <h1 className='font-bold text-[350%] text-center text-white'>About Us</h1>
                <p className='mt-2 text-white'>evolution is banned in schools in the south. search up Scopes Monkey Trial in our very own search engine</p>
                <br></br>
                <div className='body'>
                    <h1>About SwapWikiMachine</h1>
                    <div className='text-left bg-[grey] p-3 bg-opacity-30 text-white'>
                        <p>Can't understand a journal article? Feeling lost in a textbook chapter? Wikipedia is your friend -- but it's so big! SwapWikiMachine determines the most relevant Wikipedia pages to your text using the vector space model. Happy learning!</p>
                    </div>
                </div>
                <br></br>
                <div className='body'>
                    <div className='text-[350%] font-bold w-auto'>
                        <h1>Instructions</h1>
                    </div>
                    <div className='text-left text-[160%] bg-[grey] p-3 bg-opacity-30 text-white'>
                        <ol className="list-decimal">
                            <li>Get a life</li>
                            <li>Get a life</li>
                            <li>Get a life</li>
                            <li>Get a life</li>
                            <li>Get a life</li>
                        </ol>
                    </div>
                </div>
                <br></br>
                <div class='body'>
                    <div className='text-[350%] font-bold w-auto'>
                        <h1>Vector Space Model</h1>
                    </div>
                    <div className='text-left bg-[grey] p-4 mt-2 bg-opacity-30 text-white'>
                        <p>Each document is represented by a vector, where each component corresponds to a term and its tf-idf weight.</p>
                        <ul className="list-decimal">
                            <li>Document frequency: how many documents a word appears in </li>
                            <li>Term frequency: vector of the frequencies of a word in each document</li>
                            <li>Weight = tf * idf = term frequency in ith document * log(# of documents / ith document frequency)</li>
                            <li>Brief justification: term with greater frequency in the ith document and appears in fewer documents overall would “matter” more to the ith document</li>
                            <li>Given a document’s weight vector, find the most similar document by comparing the dot products with other document’s weight vectors (greater dot product means greater similarity)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <br />
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