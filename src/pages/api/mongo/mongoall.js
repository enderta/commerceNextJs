import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {check, validationResult} from 'express-validator';
import connect from './monogo';
import post from './scheme'
const secret = 'your_secret_key_here';
export default async function handler (res,req){
    const {method} = req;
    if (method === 'POST') {
        try {
            await check("title", "Please enter a title").not().isEmpty().run(req);
            await check("content", "Please enter some content").not().isEmpty().run(req);
            await check("author", "Please enter an author").not().isEmpty().run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
           const post = new post({title, content, author, image_url});
            //only allow logged in users to create posts
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({message: "Unauthorized"});
            }
            const decoded = jwt.verify(token, secret);
            if (decoded.user.role !== "admin") {
                return res.status(403).json({message: "Forbidden"});
            }
            await post.save();
            res.status(200).json(
                {
                    status: "success",
                    message: "Post created successfully",
                    data: {
                     post
                    }

        }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    } else if (method === 'GET') {
        const search = req.query.search || "";
        const db = await connect();
        try {
          if(search){
              const result= await db.collection('blog_posts')
                  .find(
                        {title: {$regex: search, $options: 'i'}},
                        {content: {$regex: search, $options: 'i'}},
                      {author: {$regex: search, $options: 'i'}},

                  ).sort({created_at: -1}).toArray();
                res.status(200).json({
                    status: "success",
                    message: `${result.length} blog posts`,
                    data: {
                        result

                    }
                });
            }else{
                const result= await db.collection('blog_posts')
                .find().sort({created_at: -1}).toArray();
                res.status(200).json({
                    status: "success",
                    message: `${result.length} blog posts`,
                    data: {
                        result
                    }
                }
                );

          }
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }



    }
}