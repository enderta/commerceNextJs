import express from "express";
import BlogPost from "./scheme.mjs";
import connect from './monogo.mjs'


const app = express();

connect().then(r => console.log(r)).catch(e => console.log(e));

const insert = async (req, res) => {
    const { title, content, author } = req.body;
    const newPost = new BlogPost({
        title,
        content,
        author,
    });
    try {
        await newPost.save();
        res.status(201).json({
            message: "Post created successfully",
            data: newPost,
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

app.use(express.json());
app.post("/posts", insert);

const getPosts = async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json({
            message: `${posts.length} posts found`,
            data: posts,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

app.get("/posts", getPosts);

const getOne= async (req, res) => {
    const { id } = req.params;
    try {
        const post = await BlogPost.findById(id);
        res.status(200).json({
            message: "Post found",
            data: post,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

app.get("/posts/:id", getOne);

const update=async (req,res)=>{
    const {id}=req.params;
    const {title,content,author}=req.body;
    try {
        const updatedPost=await BlogPost.findByIdAndUpdate(id,{title,content,author},{new:true});
        res.status(200).json({
            message:"Post updated",
            data:updatedPost
        })
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

app.patch("/posts/:id",update);

const del=async (req,res)=>{
    const {id}=req.params;
    try {
        await BlogPost.findByIdAndDelete(id);
        res.status(200).json({
            message:"Post deleted"
        })
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

app.delete("/posts/:id",del);


app.listen(5000, () => console.log("Server Running"));
