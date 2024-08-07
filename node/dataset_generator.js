const draw = require("../common/draw");
const constants = require("../common/constants.js");
const utils = require("../common/utils.js");

const {createCanvas} = require("canvas");
const canvas =  createCanvas(400,400);
const ctx = canvas.getContext("2d");



const fs=require("fs");

const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];

let id = 1;
fileNames.forEach(fn => {
    const content = fs.readFileSync(constants.RAW_DIR + "/" + fn);
    const {session, student, drawings} = JSON.parse(content);
    for (let label in drawings){
        samples.push({
            id,
            label,
            student_name: student,
            student_id: session
        });

        const paths = drawings[label];
        
        // Creating Json files for the paths
        fs.writeFileSync(constants.JSON_DIR + "/" + id +".json", JSON.stringify(paths));

        // Creating the image files for each id
        generateImageFile(constants.IMAGE_DIR + "/" + id + ".png", paths);

        utils.printProgress(id, fileNames.length*8);

        id++;
    }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFile(outputFile, paths){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    draw.paths(ctx, paths);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outputFile, buffer);
}