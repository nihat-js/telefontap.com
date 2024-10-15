const Busboy = require("busboy");
const express = require("express");
const prisma = require("../config/db");
const { API_RESPONSE_CODES, FILE_UPLOAD_SETTINGS } = require("../config/constants");
const path = require("path")
const fs = require("fs")

const router = express.Router();

router.post("/", uploadImage)
router.delete("/:", deleteImage)


async function uploadImage(req, res) {
  const userId = 1
  let result = await prisma.userUploadedImage.count({
    where: {
      userId
    }
  })

  if (result > FILE_UPLOAD_SETTINGS.MAX_FILES) {
    return res.status(API_RESPONSE_CODES.BAD_REQUEST).json({ CODE: "EXCEEDED_MAX_FILE_COUNT" })
  }

  const busboy = Busboy({ headers: req.headers });

  let fileData = {}

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const extension = path.extname(filename.filename);
    const saveTo = path.join("uploads", `${Date.now()}${extension}`);

    fileData.filename = filename;
    fileData.mimetype = mimetype;

    // Pipe the file to the save location
    file.pipe(fs.createWriteStream(saveTo));

  });

  busboy.on('finish', async () => {
    let result = await prisma.userUploadedImage.create({
      data: {
        url: fileData.filename.filename,
        userId: userId
      }
    })

    res.json({
      message: 'File uploaded successfully!',
      file: fileData,
    });
  });

  req.pipe(busboy)


}

async function deleteImage() {

}

module.exports = router