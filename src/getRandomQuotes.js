import quotes from "./quotes";
const max = quotes.length;

const randomNumberArray = (count) => {
    const traverse = (i, numbers) => {
        if (i === count) {
            return numbers;
        };

        const next = Math.floor(Math.random() * max);

        if (numbers.includes(next)) {
            return traverse(i, numbers);
        }

        numbers[i] = next;
        return traverse(i + 1, numbers);
    };

    return traverse(0, Array(count).fill(1));
};

const getRandomQuotes = (quoteCount) =>
        randomNumberArray(Math.min(quoteCount, max - 1))
        .map(x => quotes[x]);

export default getRandomQuotes;