const multer = require('multer')
const helper = require('../helper/helper')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const maxSize = 2 * 2000 * 2000

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
    // console.log('oke')
  } else {
    cb(new Error('File Must Jpeg or PNG'), false)
    // console.log('gak oke')
  }
}

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter
}).single('user_image')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(res, 400, err.message)
    } else if (err) {
      return helper.response(res, 400, err.message)
    }
    next()
    // Everything went fine.
  })
}

module.exports = uploadFilter
