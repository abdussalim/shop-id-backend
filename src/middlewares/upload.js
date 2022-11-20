// const path = require("path");
// const multer = require("multer");
// const crypto = require("crypto");

// // management file
// const multerUpload = multer({
//   storage: multer.diskStorage({
//     filename: (req, file, cb) => {
//       const name = crypto.randomBytes(30).toString("hex");
//       const ext = path.extname(file.originalname);
//       const filename = `${name}${ext}`;
//       cb(null, filename);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.fieldname === "image") {
//       // filter mimetype
//       if (
//         file.mimetype === "image/png" ||
//         file.mimetype === "image/jpg" ||
//         file.mimetype === "image/jpeg"
//       ) {
//         cb(null, true);
//       } else {
//         cb(
//           { message: "Photo extension only can .jpg, .jpeg, and .png" },
//           false
//         );
//       }
//     } else {
//       // filter mimetype
//       if (file.mimetype === "video/mp4" || file.mimetype === "video/3gpp") {
//         cb(null, true);
//       } else {
//         cb({ message: "Video extension only can .mp4 or .3gp" }, false);
//       }
//     }
//   },
//   limits: { fileSize: 50000000 },
// });

// // middleware
// module.exports = (req, res, next) => {
//   const multerFields = multerUpload.fields([
//     {
//       name: "image",
//       maxCount: 4,
//     },
//   ]);
//   multerFields(req, res, (err) => {
//     if (err) {
//       console.log(err);
//       let errorMessage = err.message;
//       if (err.code === "LIMIT_FILE_SIZE") {
//         errorMessage = `File ${err.field} too large, max 50mb`;
//       }
//       res.json({
//         message: "Error",
//       });
//     } else {
//       next();
//     }
//   });
// };

const createError = require("http-errors");
const multerFileUploader = require("multer");
const maxSize = 2048 * 1000; //2 MB File size
const path = require("path");

const storagePropeties = multerFileUploader.diskStorage({
  // destination: function (request, file, cb) {
  //   cb(null, "./src/uploads");
  // },
  filename: function (request, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtentions = path.extname(file.originalname);
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "-" +
        uniqueSuffix +
        `${fileExtentions}`
    );
  },
});

const fileFiltered = (request, file, cb) => {
  fileExtentions = path.extname(file.originalname);
  fileLimit = parseInt(request.headers["Content-Length"]);
  try {
    if (fileLimit > maxSize) throw `Just upload file with less than 2 MB!`;
    // if (fileExtentions != ".png" || fileExtentions != ".jpg" || fileExtentions != ".jpeg") throw `File extension does not supported!(just upload PNG,JPG and JPEG)`;
    cb(null, true);
  } catch (error) {
    return cb(new createError(400, error));
  }
};

// verify image
const upload = multerFileUploader({
  storage: storagePropeties,
  limits: { fileSize: maxSize },
  fileFilter: fileFiltered,
});

module.exports = upload;
