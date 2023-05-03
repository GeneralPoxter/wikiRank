import Header from '../components/header.js'

export default function About() {
    return (
        <div className='bg-[#1e1e2e]'>
            <Header></Header>
            <div className='relative top-[10px] p-[3em] w-[50%] m-auto bg-[#181825] bg-opacity-60 rounded-xl shadow-lg shadow-black'>
                <div className='body'>
                    <div className='text-[200%] font-bold w-auto pb-3'>
                        <h1>Why wikiRank?</h1>
                    </div>
                    <p className='text-lg'>Can't understand a journal article? Feeling lost in a textbook chapter? Wikipedia is your friend &#8212; but it's so big! wikiRank analyzes your text to determine the most relevant Wikipedia pages using the vector space model. Happy learning!</p>
                </div>
                <br></br>
                <div className='body'>
                    <div className='text-[200%] font-bold w-auto pb-3'>
                        <h1>Instructions</h1>
                    </div>
                    <div className='text-lg'>
                        <ol className="list-decimal pl-8">
                            <li>Paste the text you want to study in the top text box</li>
                            <li>Enter the relevant keywords separated by commas (,)</li>
                            <li>Press the rank button and enjoy the Wikipedia article rankings</li>
                        </ol>
                    </div>
                    <br></br>
                    <p className='text-lg'>Here's an example use case! Suppose I want to read Gerard Salton's celebrated paper on the vector space model, but I first need some background knowledge from Wikipedia. I can do this by pasting into the first box the paper's abstract:</p>
                    <blockquote className="p-2 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                        <p className="text-sm italic font-medium leading-relaxed text-gray-900 dark:text-white">In a document retrieval, or other pattern matching environment where stored entities (documents) are compared with each other or with incoming patterns (search requests), it appears that the best indexing (property) space is one where each entity lies as far away from the others as possible; in these circumstances the value of an indexing system may be expressible as a function of the density of the object space; in particular, retrieval performance may correlate inversely with space density. An approach based on space density computations is used to choose an optimum indexing vocabulary for a collection of documents. Typical evaluation results are shown, demonstating the usefulness of the model.</p>
                        <p className="pl-10 text-sm bold font-medium leading-relaxed text-gray-700 dark:text-white">&#8212; "A vector space model for automatic indexing" (Salton, Wong, & Yang 1975)</p>
                    </blockquote>
                    <p className='text-lg'>I can then paste into the keywords box the following keywords from the paper:</p>
                    <blockquote className="p-2 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                        <p className="text-sm bold font-medium leading-relaxed text-gray-700 dark:text-white">automatic information retrieval, automatic indexing, content analysis, document space</p>
                    </blockquote>
                    <p className='text-lg'>These keywords define the set of articles over which the model will rank the most relevant pages for me to read. After hitting the rank button, wikiRank will recommend these top pages (and more!) for perusal:</p>
                    <div className='text-lg'>
                        <ol className="list-decimal pl-8">
                            <li><a href="https://en.wikipedia.org/wiki/Information_retrieval">Information retrieval</a></li>
                            <li><a href="https://en.wikipedia.org/wiki/Vector_space_model">Vector space model</a></li>
                            <li><a href="https://en.wikipedia.org/wiki/Subject_indexing">Subject indexing</a></li>
                        </ol>
                    </div>
                </div>
                <br></br>
                <div class='body'>
                    <div className='text-[200%] font-bold w-auto pb-3'>
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
        </div >
    );
}