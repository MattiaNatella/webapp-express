import multer from "multer";

// upload dellimmagine
const storage = multer.diskStorage({
    destination: "./public/img/books",
    filename: (req, file, cb) => {
        // creo un nome univoco per il file
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage });

module.exports = upload;