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
    return Math.log10(corpus.documents.length / (1 + corpus.docFrequencies.get(term)));
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
    corpus.documents.slice(0, -1).forEach(document =>
        ranks.set(document, sim(weights.get(query), weights.get(document)))
    );

    return [...ranks.entries()].sort((a, b) => b[1] - a[1]);
}