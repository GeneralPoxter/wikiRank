export default function About() {
    return (
        <div className='text-center bg-gradient-to-r from-blue-900 to-purple-900'>
            <h1>About SwapWikiMachine</h1>
            <div>
                Can't understand a journal article? Feeling lost in a textbook chapter? Wikipedia is your friend -- but it's so big! SwapWikiMachine determines the most relevant Wikipedia pages to your text using the vector space model. Happy studying!
            </div>

            <h1>Vector space model</h1>
            <div>
                Each document is represented by a vector, where each component corresponds to a term and its tf-idf weight.


            </div>
        </div>
    )
}