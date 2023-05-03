import Head from 'next/head';
import Header from '../components/header.js';
import Footer from '../components/footer.js';

export default function About() {
    const blockStyle = "p-5 my-4 border-l-4 border-[#b4befe] bg-[#313244]";
    const blockTextStyle = "text-lg leading-relaxed text-[#bac2de]";
    const highlightStyle = "italic text-[#89b4fa]";

    return (
        <div className='bg-[#1e1e2e]'>
            <Head>
                <title>wikiRank - About</title>
            </Head>
            <Header></Header>
            <div className='p-[3em] mx-[5%] text-[#cdd6f4] bg-[#181825] rounded-xl leading-2'>
                <h1 className='text-[200%] font-bold w-auto pb-3'>Why wikiRank?</h1>
                <p className='text-lg'>Can't understand a journal article? Feeling lost in a textbook chapter? Wikipedia is your friend &#8212; but it's so big! wikiRank analyzes your text to determine the most relevant Wikipedia pages using the vector space model. Happy learning!</p>
                <br></br>

                <h1 className='text-[200%] font-bold w-auto pb-3'>Instructions</h1>
                <ol className="list-decimal text-lg ml-8">
                    <li>Paste the text you want to study in the top text box</li>
                    <li>Enter the relevant keywords separated by commas</li>
                    <li>Press the button and enjoy the Wikipedia article rankings</li>
                </ol>
                <br></br>

                <h1 className='text-[200%] font-bold w-auto pb-3'>Example</h1>
                <p className='text-lg'>Here's an example use case! Suppose I want to read Gerard Salton's <a className="underline text-[#89b4fa]" href="https://dl.acm.org/doi/10.1145/361219.361220">celebrated paper</a> on the vector space model, but I first need some background knowledge from Wikipedia. I can do this by pasting a query text into the top text box. In this case, my query text could be the paper's abstract:</p>
                <blockquote className={blockStyle}>
                    <p className={blockTextStyle + " italic"}>In a document retrieval, or other pattern matching environment where stored entities (documents) are compared with each other or with incoming patterns (search requests), it appears that the best indexing (property) space is one where each entity lies as far away from the others as possible; in these circumstances the value of an indexing system may be expressible as a function of the density of the object space; in particular, retrieval performance may correlate inversely with space density. An approach based on space density computations is used to choose an optimum indexing vocabulary for a collection of documents. Typical evaluation results are shown, demonstating the usefulness of the model.</p>
                    <br></br>
                    <p className={blockTextStyle + " pl-8"}>&#8212; "A vector space model for automatic indexing" (Salton, Wong, & Yang 1975)</p>
                </blockquote>
                <p className='text-lg'>I can then paste into the keywords box the following keywords from the paper:</p>
                <blockquote className={blockStyle}>
                    <p className={blockTextStyle}>automatic information retrieval, automatic indexing, content analysis, document space</p>
                </blockquote>
                <p className='text-lg'>By gathering the top Wikipedia search results for each of these keywords, our model defines the corpus of articles over which it will rank the most relevant pages to my query. After hitting the rank button, wikiRank will recommend these top pages (and more!) for perusal:</p>
                <ol className="text-lg p-2 list-decimal ml-8">
                    <li><a className="underline text-[#89b4fa]" href="https://en.wikipedia.org/wiki/Information_retrieval" target='_blank'>Information retrieval</a></li>
                    <li><a className="underline text-[#89b4fa]" href="https://en.wikipedia.org/wiki/Vector_space_model" target='_blank'>Vector space model</a></li>
                    <li><a className="underline text-[#89b4fa]" href="https://en.wikipedia.org/wiki/Subject_indexing" target='_blank'>Subject indexing</a></li>
                </ol>
                <br></br>

                <h1 className='text-[200%] font-bold w-auto pb-3'>Vector space model</h1>
                <p className='text-lg'>In the vector space model, each document is represented by a vector, where each component corresponds to a term and its tf-idf weight.</p>
                <h2 className='text-xl py-2 font-bold'>What is a term?</h2>
                <p className='text-lg'>A term is a fundamental unit of text analysis. In practice, these are the set of words in a document (e.g. the terms of <span className={highlightStyle}>"information retrieval"</span> are <span className={highlightStyle}>"information"</span> and <span className={highlightStyle}>"retrieval"</span>). However, some parsing should still occur. For example, we do not want to distinguish between letter cases, nor would we want to include spaces, punctuation, or numbers in our terms. Our model also pre-processes your text by filtering out stop words &#8212; a fixed list of words picked by experts to be insignificant when ranking a document's relevance (e.g. <span className={highlightStyle}>"a"</span>, <span className={highlightStyle}>"the"</span>, <span className={highlightStyle}>"it"</span>).</p>
                <h2 className='text-xl py-2 font-bold'>What is a tf-idf vector?</h2>
                <p className='text-lg'>Term frequency or <span className={highlightStyle}>tf</span> is defined by how many times a given term appears in a given document. For example, the <span className={highlightStyle}>tf</span> of the term <span className={highlightStyle}>"frequency"</span> in the document <span className={highlightStyle}>"term frequency inverse document frequency"</span> is 2.</p>
                <p className="text-lg">Similarly, the document frequency or <span className={highlightStyle}>df</span> of a term is the number of documents it appears in. For example, the <span className={highlightStyle}>df</span> of <span className={highlightStyle}>"frequency"</span> given 3 documents <span className={highlightStyle}>"term frequency"</span>, <span className={highlightStyle}>"inverse document frequency"</span>, and <span className={highlightStyle}>"bazinga!"</span> is 2.</p>
                <p className="text-lg">The inverse document frequency or <span className={highlightStyle}>idf</span> of a term is defined as follows:</p>
                <ul className="text-lg p-2 list-decimal ml-8">
                    <li>Document frequency: how many documents a word appears in </li>
                    <li>Term frequency: vector of the frequencies of a word in each document</li>
                    <li>Weight = tf * idf = term frequency in ith document * log(# of documents / ith document frequency)</li>
                    <li>Brief justification: term with greater frequency in the ith document and appears in fewer documents overall would “matter” more to the ith document</li>
                    <li>Given a document's weight vector, rank the document's relevance by comparing the cosine similarities with other document's weight vectors (greater dot product means greater similarity)</li>
                </ul>
            </div>
            <Footer></Footer>
        </div>
    );
}