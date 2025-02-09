import multer from 'multer';

// Configure where to store the uploaded files (in your 'public/uploads' directory)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Specify the directory to store the files
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.originalname; // Use current timestamp for unique filename
        cb(null, filename); // Specify the filename for the uploaded file
    }
});

// Create the multer upload middleware
const upload = multer({ storage });

// Export the upload middleware to be used in routes
export const fileUploadMiddleware = upload.single('file'); // 'file' is the field name for the file input in the form
