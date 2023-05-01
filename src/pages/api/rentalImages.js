import {connectDb} from '../db';

export default async function rentalImages(req, res) {
    const {method} = req;
    const {client} = await connectDb();
    const property_id = req.query.property_id || "";
    if(property_id){
        if (method === 'GET') {
            try {
                const {rows} = await client.query(
                    "SELECT * from property_images WHERE property_id=$1;"
                    , [property_id],
                );
                res.status(200).json({
                        status: "success",
                        message: `${rows.length} images found for property_id: ${property_id}`,
                        data: {
                            rows
                        }
                    }
                );
            } catch (err) {
                console.error(err);
            }
        }
    }else{
        if(method==="GET"){
            try {
                const {rows} = await client.query(
                    "SELECT * from property_images;"
                );
                res.status(200).json({
                        status: "success",
                        message: `${rows.length} images found`,
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
}