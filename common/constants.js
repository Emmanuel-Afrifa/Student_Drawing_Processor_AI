const constants = {};

constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.IMAGE_DIR = constants.DATASET_DIR + "/image";
constants.SAMPLES = constants.DATASET_DIR + "/samples.json";

if (typeof module !== undefined){
    module.exports = constants;
}