import multer from "multer";
import path from "path";

// Fix: Ensure files are saved outside `src/`
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("../public/uploads")); // Absolute path to `../public/uploads`
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    }
});

export const fileUploadMiddleware = multer({ storage }).single("imageUrl"); // Field name must match form-data key in Postman
