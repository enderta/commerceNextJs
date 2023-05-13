import express from "express";
import mongoose from "mongoose";
import BlogPost from "./scheme.mjs";
import connect from './monogo.mjs'
const app = express();

connect().then(r => console.log(r)).catch(e => console.log(e));

let id=1;
const insert = async (req, res) => {
    const { title, content, author } = req.body;
    const newPost = new BlogPost({
        id: id++,
        title,
        content,
        author,
    });
    try {
        await newPost.save();
        res.status(201).json({
            message: "Post created successfully.",
            post: {
                id: newPost.id,
                title: newPost.title,
                content: newPost.content,
                author: newPost.author,
                created_at: newPost.created_at,
            }
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
            message:`${posts.length} posts found.`,
            data:{
                posts:posts.map((post)=>({
                    id:post.id,
                    title:post.title,
                    content:post.content,
                    created_at:post.created_at,
                }))
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

app.get("/posts", getPosts);

const updatePost = async (req, res) => {
    const id=req.params.id;
    const { title, content, author } = req.body;
    try{
        const updatedPost = await BlogPost.findOneAndUpdate({ id: id }, { title, content, author }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found." });
        }
        res.status(200).json({
            message: "Post updated successfully.",
            post: {
                id: updatedPost.id,
                title: updatedPost.title,
                content: updatedPost.content,
                created_at: updatedPost.created_at,
                updated_at: updatedPost.updated_at,
    }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findOne=async (req,res)=>{
    const id=req.params.id;
    try{
        const getOne=await BlogPost.findOne({id:id});
        if(!getOne){
            return res.status(404).json({message:"Post not found."});
        }
        res.status(200).json({
            message:"Post found.",
            post: {
                id: getOne.id,
                title: getOne.title,
                content: getOne.content,
                created_at: getOne.created_at,
            }
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

app.get("/posts/:id",findOne);

app.put("/posts/:id", updatePost);

const deletePost = async (req, res) => {
    const id=req.params.id;
    try {
        const deletedPost = await BlogPost.findOneAndDelete({ id: id });
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found." });
        }
        res.status(200).json({
            message: "Post deleted successfully.",
            post: {
                id: deletedPost.id,
                title: deletedPost.title,
                content: deletedPost.content,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


app.delete("/posts/:id", deletePost);

app.listen(5000, () => console.log("Server Running"));
