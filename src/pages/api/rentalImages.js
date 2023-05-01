import {connectDb} from '../db';

export default async function rentalImages(req, res) {
    const {method} = req;
    const {client} = await connectDb();
    if (method === 'GET') {
        try {
            const {rows} = await client.query(
                "SELECT * FROM property_images;"

            );
            res.status(200).json({
                    status: "success",
                    message: `${rows.length} images found`,
                    data: {
                        rows
                    },
                image_url: rows.map((row) => row.image_url)
                }
            );
        } catch (err) {
            console.error(err);
        }
    } else if (method === "POST") {
        const {property_id, image_url} = req.body;
        try {
            const {rows} = await client.query(
                "INSERT INTO property_images (property_id, image_url) VALUES ($1, $2);"
                , [property_id, image_url],
            );
            res.status(200).json({
                    status: "success",
                    message: `image added for property_id: ${property_id}`,
                    data: {
                        rows
                    }
                }
            );
        }
        catch (err) {
            console.error(err);
        }
    }

}