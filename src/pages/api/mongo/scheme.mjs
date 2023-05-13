import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    id: { type: Number, required: false },
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
