
export const createFunction = (() => {
    const cache = {};

    return (...args) => {
        const key = args.join('&');
        return cache[key] ?? (cache[key] = new Function(...args));
    }
})();
