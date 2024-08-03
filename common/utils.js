const utils = {};

// Creating the percentFormat method
utils.percentFormat = (n) => {
    return (n*100).toFixed(2) + "%";
}

// Adding a method that prints the progress of the prgram
utils.printProgress = (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.percentFormat(count / max);
    process.stdout.write(count + "/" + max + " (" + percent + ")");
}

if (typeof module !== undefined){
    module.exports = utils;
}