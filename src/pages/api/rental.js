import {connectDb} from '../db';
import {check, validationResult} from 'express-validator';


export default async function rental(req, res) {
    const {method} = req;
    const {client} = await connectDb();
    const search = req.query.search || "";
    if (method === 'GET') {
    try{
        if (search==='true'){
            const {rows} = await client.query(
                'select p.*, i.* from properties p join property_images i on p.id = i.property_id where P.is_rental =TRUE ORDER BY P.price ASC'
            );
            res.status(200).json({
                status: "success",
                message: `${rows.length} rental properties`,
                data: {
                    rows

                }
            });
        }
        else if (search==='false'){
            const {rows} = await client.query(
                'select p.*, i.* from properties p join property_images i on p.id = i.property_id where P.is_rental =FALSE ORDER BY P.price ASC'
            );
            res.status(200).json({
                status: "success",
                message: `${rows.length} for sale properties`,
                data: {
                    rows

                }
            });
        }
        else{
            const {rows} = await client.query(
                'select p.*, i.* from properties p join property_images i on p.id = i.property_id ORDER BY P.price ASC'
            );
            res.status(200).json({
                status: "success",
                message: `${rows.length} rental and for sale properties`,
                data: {
                    rows

                }
            });
        }
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
    finally {
        client.release();
    }
}}