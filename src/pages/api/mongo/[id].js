import BlogPost from "./scheme.mjs";
import connect from './monogo.mjs'


export default async function handler(req, res) {
    await connect();
    const method = req.method;
    const {id}=req.query;
    if(method==="GET"){
        try {
            const post = await BlogPost.findById(id);
            res.status(200).json({
                message: "Post found",
                data: post,
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    else if(method==="PUT"){
        const {title, content, author}=req.body;
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
    else if(method==="DELETE"){
        try {
            await BlogPost.findByIdAndDelete(id);
            res.status(200).json({
                message:"Post deleted"
            })
        } catch (error) {
            res.status(404).json({message:error.message})
        }
    }
    else{
        res.status(400).json({message:"Invalid request"})
    }

}