const path = require("path");
const multer = require("multer");

var productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/product/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});


const uploadProductImage = multer({
  storage: productStorage,
  limits: {
    // fieldSize: 2 * 1024 * 1024,
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      callback(null, true);
    } else {
      console.log("select valid image format");
      callback(null, false);
    }
  },
  
});

// Helper function to get relative path starting with "/uploads"
const getRelativePath = (absolutePath) => {
  const relativePath = path.relative(process.cwd(), absolutePath);

  return `uploads/${relativePath.split(path.sep).slice(2).join("/")}`;
};

module.exports = { uploadProductImage, getRelativePath };
