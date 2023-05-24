import quotes from "./quotes.json";
import getRandomQuotes from "./getRandomQuotes";
import searchQuotes from "./searchQuotes";

import { 
    error,                  // creates error responses
    json,                   // creates JSON responses
    Router,                 // the ~440 byte router itself
    withParams,             // middleware: puts params directly on the Request
  } from 'itty-router';

// Create a new Router
const router = Router();

// Register the route to return quotes
router
    // Add some middleware upstream on all routes
    .all('*', withParams) 

    // GET and array of quotes
    .get('/', () => quotes[Math.floor(Math.random() * quotes.length)])

    // GET a random quote
    .get('/quotes', () => quotes)

    // GET an array with <count> quotes
    .get('quotes/:count', ({ params }) => getRandomQuotes(params.count) || error(404, 'No matches found.'))

    // GET an array of quotes matching <term> without case sensitivity e.g
    .get('quotes/search/:term', ({ params }) => searchQuotes(params.term) || error(404, 'No matches found.'))

    // 404 for everything else
    .all('*', () => error(404)
);


export default {
    fetch: (request, ...args) => router
                                    .handle(request, ...args)
                                    .then(json)    // send as JSON
                                    .catch(error)  // catch errors
};