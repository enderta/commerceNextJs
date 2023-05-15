const conn = require('./monogo.js');
const BlogPost = require('./scheme.js');

module.exports = async function mongoApi(req, res){
    await conn();

    const method = req.method;
    if(method === 'POST') {
       const {title,content,author} = req.body;

        try {
           const newPost= new BlogPost(
                {
                     title: title,
                     content: content,
                    author: author}
           );
              await newPost.save();
            res.status(201).json({
                message: "Post created successfully",
                data: newPost,
            });
        } catch (error) {
            res.status(409).json({ message: error.message });
        }

    } else if(method === 'GET') {
        try {
            const posts = await BlogPost.find();
            res.status(200).json({
                message: `${posts.length} posts found`,
                data: posts,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }

    }
   else {
        res.status(400).json({ message: "Only GET and POST requests allowed" });
    }



}