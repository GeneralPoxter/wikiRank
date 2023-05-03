export default function About() {
    return (
        <div className='bg-[#1e1e2e]'>
            <div className='relative top-[10px] p-3 w-[50%] m-auto bg-black bg-opacity-60 shadow-lg shadow-black'>
                <h1 className='font-bold text-[350%] text-center text-white'>About Us</h1>
                <p className='mt-2 text-white italic text-center'>"I am out of steam and going to cream"</p>
                <br></br>
                <div className='body'>
                    <div className='text-[200%] font-bold w-auto'>
                        <h1>About SwapWikiMachine</h1>
                    </div>
                    <div className='text-left bg-[grey] p-3 bg-opacity-30 text-white'>
                        <p>Can't understand a journal article? Feeling lost in a textbook chapter? Wikipedia is your friend -- but it's so big! SwapWikiMachine determines the most relevant Wikipedia pages to your text using the vector space model. Happy learning!</p>
                    </div>
                </div>
                <br></br>
                <div className='body'>
                    <div className='text-[200%] font-bold w-auto'>
                        <h1>Instructions</h1>
                    </div>
                    <div className='text-left text-[120%] bg-[grey] p-3 bg-opacity-30 text-white'>
                        <ol className="list-decimal ml-5">
                            <li>Paste the text you want to study in the top text box</li>
                            <li>Enter the relevant keywords separated by commas (,)</li>
                            <li>Press the rank button and enjoy the Wikipedia article rankings</li>
                        </ol>
                    </div>
                </div>
                <br></br>
                <div class='body'>
                    <div className='text-[200%] font-bold w-auto'>
                        <h1>Vector Space Model</h1>
                    </div>
                    <div className='text-left bg-[grey] p-4 mt-2 bg-opacity-30 text-white'>
                        <p>Each document is represented by a vector, where each component corresponds to a term and its tf-idf weight.</p>
                        <ul className="list-decimal ml-5">
                            <li>Document frequency: how many documents a word appears in </li>
                            <li>Term frequency: vector of the frequencies of a word in each document</li>
                            <li>Weight = tf * idf = term frequency in ith document * log(# of documents / ith document frequency)</li>
                            <li>Brief justification: term with greater frequency in the ith document and appears in fewer documents overall would “matter” more to the ith document</li>
                            <li>Given a document’s weight vector, rank the document's relevance by comparing the cosine similarities with other document’s weight vectors (greater dot product means greater similarity)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
}