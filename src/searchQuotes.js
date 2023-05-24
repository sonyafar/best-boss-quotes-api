import quotes from "./quotes";

const searchQuotes = (term) => {
    const regExp = new RegExp(term, 'i');
    return quotes.filter(quote => quote.match(regExp));
};

export default searchQuotes;