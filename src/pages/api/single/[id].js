import {connectDb} from "@/pages/db";


export default async function handler(req, res) {
    const {client} = await connectDb();
    const {method} = req;
    const {id} = req.query;

    if (method === "GET") {
        try {
            const {rows} = await client.query(
                //select p.*,i.*,r.* from properties p join property_reviews r on p.id=r.property_id join property_images i on p.id = i.property_id where p.id=1;
                `select p.*,i.*,r.* from properties p join property_reviews r on p.id=r.property_id join property_images i on p.id = i.property_id where p.id=$1`,
                [id]
            );
            res.status(200).json({
                status: "success",
                message: `found`,
                data: rows

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
}