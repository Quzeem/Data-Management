const multer = require('multer');
const path = require('path')
const DatauriParser = require('datauri/parser')

const parser = new DatauriParser()

const dataUri = (image) => {
    parser.format(
        `${path.extname(image.originalname).toString()}`, image.buffer
    );
}

const storage = multer.memoryStorage();

const mimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

const fileFilter = (req, files, cb) => {
    const {
        mimetype
    } = files;
    if (mimeTypes.includes(mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
// const limits = {
//     fileSize: parseInt(process.env.FILE_SIZE)
// }

const multerUpload = multer({
    storage,
    fileFilter
})

module.exports = {
    multerUpload, dataUri
}