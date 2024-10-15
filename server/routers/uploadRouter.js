const Busboy = require("busboy");
const express = require("express");
const prisma = require("../config/db");
const { API_RESPONSE_CODES, FILE_UPLOAD_SETTINGS } = require("../config/constants");
const path = require("path")
const fsPromises = require('fs').promises;
const fs = require('fs');


const router = express.Router();

router.get("/", getAll)
router.post("/", uploadImage)
router.delete("/:imageId", deleteImage)


async function uploadImage(req, res) {
  let result = await prisma.userUploadedImage.count({
    where: {
      userId: req.user.id
    }
  })

  if (result > FILE_UPLOAD_SETTINGS.MAX_FILES) {
    return res.status(API_RESPONSE_CODES.BAD_REQUEST).json({ CODE: "EXCEEDED_MAX_FILE_COUNT" })
  }

  const busboy = Busboy({ headers: req.headers });

  let fileData = {}
  let newName

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const extension = path.extname(filename.filename);
    newName = Date.now() + extension
    const saveTo = path.join("uploads", newName);

    fileData.filename = filename;
    fileData.mimetype = mimetype;

    // Pipe the file to the save location
    file.pipe(fs.createWriteStream(saveTo));

  });

  busboy.on('finish', async () => {
    let result = await prisma.userUploadedImage.create({
      data: {
        url: newName,
        userId: req.user.id
      }
    })

    res.json({
      message: 'File uploaded successfully!',
      file: fileData,
    });
  });

  req.pipe(busboy)


}

async function deleteImage(req, res) {
  let result = await prisma.userUploadedImage.findUnique({
    where: {
      id: +req.params.imageId,
      userId: req.user.id
    }
  })
  // console.log({ result })
  if (!result) {
    return res.status(API_RESPONSE_CODES.BAD_REQUEST).send()
  }

  fs.rmSync(path.join(__dirname, "../uploads", result.url))
  await prisma.userUploadedImage.update({
    where: {
      id: +req.params.imageId
    },
    data: {
      deletedAt: new Date()
    }
  })
  res.status(API_RESPONSE_CODES.SUCCESS).send()
}

async function getAll(req, res) {
  let result = await prisma.userUploadedImage.findMany({
    where: {
      userId: req.user.id
    }
  })

  res.json({
    code: "SUCCESS",
    data: result
  });
}

module.exports = router