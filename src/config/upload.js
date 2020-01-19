require("dotenv").config()
const multer = require("multer")
const path = require("path")
const crypto = require("crypto")
const multerS3 = require("multer-s3")
const aws = require("aws-sdk")

const s3 = new aws.S3({
	accessKeyId: 'AKIAIZ4YWPA6WISG3E3A',
	secretAccessKey: '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',
	Bucket: 'my-insta-test'
});

aws.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", aws.config.credentials.accessKeyId);
      console.log("Secret access key:", aws.config.credentials.secretAccessKey);
    }
  });


const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, "..", "..", "uploads"))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err)
                file.key = `${hash.toString("hex")}-${file.originalname}`
                callback(null, file.key)
            })
        }
    }),
    s3: multerS3({
        s3: s3,
        bucket: "my-insta-test",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    console.log("Access key:", aws.config.credentials.accessKeyId);
                    console.log("Secret access key:", aws.config.credentials.secretAccessKey);
                    console.log("aqui")
                    callback(err)
                }
                const fileName = `${hash.toString("hex")}-${file.originalname}`
                callback(null, fileName)
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "uploads"),
    // storage: storageTypes[process.env.STORAGE_TYPE],
    storage: storageTypes["s3"],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type."))
        }
    }
}
