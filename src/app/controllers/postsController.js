const posts = require("../models/posts")

const index = async(req, res) => {
        const post = await posts.find()
            .populate("author")
            .sort({ createAt: -1 })
        return res.json(post)
    }
const store = async(req, res) => {
        try {
            const { key } = req.file
            const { location: url = "" } = req.file
            const { description } = req.body 

            const post = await posts.create({
                img: key,
                url,
                description,
                author: req.userId
            })

            await post.populate("author").execPopulate()

            return res.json(post)
        } catch (err) {
            console.log(err)
            return res.status(400).send({ error: "Error" })
        }
    }


module.exports = {
    index,
    store
}
