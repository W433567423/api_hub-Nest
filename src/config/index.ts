// export const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(__dirname, '../tmp/my-uploads'))
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = String(Date.now()) + '-' + String(Math.round(Math.random() * 1E9))
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })
export const SERVER_PORT = 8001
