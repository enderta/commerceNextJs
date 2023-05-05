import {connectDb} from "@/pages/db";
import {useRouter} from "next/router";

// create dynamic routes for each method: /api/propertyID/1/images/1
export default async function handler(req, res) {
    const {client} = await connectDb();
    const {method} = req;
    const {propertyID, id} = req.query;

    if (method === "GET") {
        try {
            const {rows} = await client.query(
                'select * from property_images where property_id=$1 and id=$2',
                [propertyID, id]
            );
            res.status(200).json({
            status: "success",
                message:`${rows.length} images found for property ${propertyID}`,
                data: rows

        });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    } else if (method === "PUT") {
        try {
            const {rows} = await client.query(
                'update property_images set image_url=$1 where property_id=$2 and id=$3 returning *',
                [req.body.image_url, propertyID, id]
            );
            res.status(200).json({
                status: "success",
                message: `Image ${id} updated for property ${propertyID}`,
                data: rows[0],
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    } else if (method === "DELETE") {
        try {
            const {rows} = await client.query(
                'delete from property_images where property_id=$1 and id=$2',
                [propertyID, id]
            );
            res.status(200).json({
                status: "success",
                message: `Image ${id} deleted for property ${propertyID}`,
                data: rows[0],
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
     finally {
        client.release();
    }
    }

    else if(method==="POST"){
        try {
            const {rows} = await client.query(
                'insert into property_images (property_id, image_url) values ($1, $2) returning *',
                [propertyID, req.body.image_url]
            );
            res.status(200).json({
                status: "success",
                message: `Image ${id} created for property ${propertyID}`,
                data: rows[0],
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
     finally {
        client.release();
    }
    }
    else {
        res.status(400).json({
            status: "error",
            message: "Invalid request method",
        });
    }
}


