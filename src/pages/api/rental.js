import {connectDb} from '../db';
import {check, validationResult} from 'express-validator';


export default async function rental(req, res) {
    const {method} = req;
    const {client} = await connectDb();
    const search = req.query.search || "";
    const is_rental = req.query.is_rental || "";
    if (method === 'GET') {
        try {
            //rental true and search
            if (search && is_rental) {
                //select a.*,p.*,i.* from properties p join property_images i on p.id=i.property_id join address a on p.address_id=a.id ORDER BY P.price ASC;
                const {rows} = await client.query(
                    //search by city, zipcode, address,country,state
                    //SELECT DISTINCT a.*,p.*,i.* from address a JOIN properties p ON a.id=p.address_id JOIN property_images i ON p.id=i.property_id ORDER BY p.price ASC;
                    "SELECT DISTINCT r.*,a.*,p.*,i.* from address a JOIN properties p ON a.id=p.address_id JOIN property_images i ON p.id=i.property_id join property_reviews r on p.id = r.property_id WHERE (a.city ILIKE $1 OR a.zip_code ILIKE $2 OR a.address_line_1 ILIKE $3 OR a.country ILIKE $4 OR a.state ILIKE $5) AND p.is_rental=$6 ORDER BY p.price ASC;"
                    , [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, is_rental],
                );
                res.status(200).json({
                        status: "success",
                        message: `${rows.length} properties found for search term: ${search} and rental: ${is_rental}`,
                        data: {
                            rows

                        }
                    }
                );


            }
            //rental true and no search
            else if (is_rental) {
                const {rows} = await client.query(
                    //SELECT DISTINCT a.*,p.*,i.* from address a JOIN properties p ON a.id=p.address_id JOIN property_images i ON p.id=i.property_id ORDER BY p.price ASC;
                    "select distinct a.*,p.*,i.* from address a join properties p on a.id=p.address_id join property_images i on p.id=i.property_id where p.is_rental=$1 ORDER BY p.price ASC;"
                    , [is_rental],
                );
                res.status(200).json({
                        status: "success",
                        message: `${rows.length} properties found for rental: ${is_rental}`,
                        data: {
                            rows

                        }
                    }
                );
            }
            //no rental and search
            else if (search) {
                const {rows} = await client.query(

                    "SELECT DISTINCT a.*,p.*,i.* from address a JOIN properties p ON a.id=p.address_id JOIN property_images i ON p.id=i.property_id WHERE (a.city ILIKE $1 OR a.zip_code ILIKE $2 OR a.address_line_1 ILIKE $3 OR a.country ILIKE $4 OR a.state ILIKE $5) ORDER BY p.price ASC;"
                    , [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`],
                );
                res.status(200).json({
                        status: "success",
                        message: `${rows.length} properties found for search term: ${search}`,
                        data: {
                            rows
                        }
                    }
                );
            }
            //no rental and no search
            else {
                const {rows} = await client.query(
                    "SELECT DISTINCT a.*,p.*,i.* from address a JOIN properties p ON a.id=p.address_id JOIN property_images i ON p.id=i.property_id ORDER BY p.price ASC;"
                );
                res.status(200).json({
                        status: "success",
                        message: `${rows.length} properties found`,
                        data: {
                            rows
                        }
                    }
                );
            }


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } finally {
            client.release();
        }
    }
    
}