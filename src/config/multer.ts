// multer.ts
import multer from 'multer';

// Function to configure multer
const configureMulter = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Add your custom file filter logic here
    // Example: Only accept image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } 
  },
});

export default configureMulter;
