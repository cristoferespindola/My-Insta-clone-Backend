const routes = require("express").Router()
const multer = require("multer")
const uploadConfig = require("./upload")

const userController = require("../app/controllers/usersController")
const authController = require("../app/controllers/authController")
const postsController = require("../app/controllers/postsController")
const profileController = require("../app/controllers/profileController")

const authMiddlewares = require("../app/middlewares/auth")
const upload = multer(uploadConfig)

routes.get("/user", authMiddlewares, userController.index.bind(null))
routes.get("/userId", authMiddlewares, userController.show.bind(null))
routes.post("/user", userController.save.bind(null))
routes.put("/userupdate", authMiddlewares, userController.update.bind(null))

routes.post("/auth", authController.authenticate.bind(null))

routes.get("/posts", authMiddlewares, postsController.index.bind(null))
routes.post("/deletepost/:id", authMiddlewares, postsController.remove.bind(null))
routes.post(
    "/posts",
    authMiddlewares,
    upload.single("photo"),
    postsController.store.bind(null)
)


routes.get("/profile", authMiddlewares, profileController.index.bind(null))

module.exports = routes
