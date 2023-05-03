import { removeStopwords } from "stopword";

function parseDocument(wikidoc) {
    const termFrequencies = new Map();
    removeStopwords(wikidoc.text.split(/\s+/).map(term =>
        term.replace(/[^A-Za-z]/g, "").toLowerCase())
    ).forEach(term => {
        if (term.length > 0) {
            if (termFrequencies.has(term)) {
                termFrequencies.set(term, termFrequencies.get(term) + 1);
            } else {
                termFrequencies.set(term, 1);
            }
        }
    });

    return { wikidoc, termFrequencies };
}

function createCorpus(documents) {
    const terms = new Set();
    documents.forEach(document =>
        document.termFrequencies.forEach((_, key) => terms.add(key))
    );

    const docFrequencies = new Map();
    terms.forEach(term =>
        docFrequencies.set(term, documents.reduce(
            (acc, doc) => acc + (doc.termFrequencies.has(term) ? 1 : 0),
            0
        ))
    );

    return { documents, terms, docFrequencies };
}

function tf(document, term) {
    return document.termFrequencies.get(term) || 0;
}

function idf(corpus, term) {
    return Math.log10(corpus.documents.length / corpus.docFrequencies.get(term));
}

function dot(u, v) {
    return [...u.keys()].reduce(
        (acc, term) => acc + (u.get(term) || 0) * (v.get(term) || 0),
        0
    );
}

function norm(u) {
    return Math.sqrt([...u.keys()].reduce(
        (acc, term) => acc + (u.get(term) || 0) ** 2,
        0
    ));
}

function sim(u, v) {
    return dot(u, v) / (norm(u) * norm(v));
}

export function getDocumentRanks(wikidocs, query) {
    query = parseDocument({ text: query });
    wikidocs = wikidocs.map(doc => parseDocument(doc));
    wikidocs.push(query);
    const corpus = createCorpus(wikidocs);

    function vectorize(document) {
        const vector = new Map();
        corpus.terms.forEach(term =>
            vector.set(term, tf(document, term) * idf(corpus, term))
        );
        return vector;
    }

    const weights = new Map();
    corpus.documents.forEach(document =>
        weights.set(document, vectorize(document))
    );

    const ranks = new Map();
    corpus.documents.forEach(document =>
        ranks.set(document, sim(weights.get(query), weights.get(document)))
    );
    return ranks;
}

/**
 * Sample use case of the vector space model
 * Delete this before submitting
 */
export function testSwapneel() {
    const wikidocs = [
        { title: "A", text: "A house elf must be set free, sir. And the family will never set Dobby free ... Dobby will serve the family until he dies, sir" },
        { title: "B", text: "Here lies Dobby, a free elf" },
        { title: "C", text: "It's very hard to grow up in a perfect family when you're not perfect." },
        { title: "D", text: "'Well, I'll eat it,' said Alice, 'and if it makes me grow larger, I can reach the key; and if it makes me grow smaller, I can creep under the door; so either way I'll get into the garden, and I don't care which happens!'" }
    ];

    console.log(getDocumentRanks(wikidocs, "free elf free elf free elf"));
}