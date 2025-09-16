/*const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});
// ✅ Correctly exported as `upload`
const upload = multer({ storage: storage });
module.exports = upload;
//exports.upload = multer({ storage: storage });
*/
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ext);
  },
});

// ✅ Correctly exported as `upload`
const upload = multer({ storage: storage });
module.exports = upload;