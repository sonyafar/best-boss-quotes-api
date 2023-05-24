import quotes from "./quotes.json";
import getRandomQuotes from "./getRandomQuotes";
import searchQuotes from "./searchQuotes";

import { 
    error,                  // creates error responses
    json,                   // creates JSON responses
    Router,                 // the ~440 byte router itself
    withParams,             // middleware: puts params directly on the Request
  } from 'itty-router';


const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-type": "application/json",
};


// Create a new Router
const router = Router();

// Register the route to return quotes
router
    // Add some middleware upstream on all routes
    .all('*', withParams) 

    // GET and array of quotes
    .get('/', () => {
        let random_quote = quotes[Math.floor(Math.random() * quotes.length)];
        return new Response(JSON.stringify({ quote: random_quote }), {
            headers: { ...headers },
        });
    })

    // GET a random quote
    .get('/quotes', () => {
        return new Response(JSON.stringify(quotes), {
            headers: { ...headers },
        });
    })

    // GET an array with <count> quotes
    .get('quotes/:count', ({ params }) => {
        let random_quote_set = getRandomQuotes(params.count);
        return new Response(JSON.stringify(random_quote_set) || error(404, 'No matches found.'), {
            headers: { ...headers },
        });
    })

    // GET an array of quotes matching <term> without case sensitivity e.g
    .get('quotes/search/:term', ({ params }) => {
        let random_quote_set = searchQuotes(params.term);
        return new Response(JSON.stringify(random_quote_set) || error(404, 'No matches found.'), {
            headers: { ...headers },
        });
    })
    // 404 for everything else
    .all('*', () => error(404)
);


export default {
    fetch: (request, ...args) => router
                                    .handle(request, ...args)
                                    .then(json)    // send as JSON
                                    .catch(error => {
                                        return new Response(error.toString(), {
                                            status: 500,
                                            headers: { ...headers },
                                        });
                                    })  // catch errors
};
