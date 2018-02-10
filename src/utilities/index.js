const delay = (amount) => {
    return new Promise((resolve) => {
        setTimeout(resolve, amount);
    });
}

// more functions here

export { delay };
