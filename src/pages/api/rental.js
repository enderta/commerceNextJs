import {connectDb} from '../db';
import {check, validationResult} from 'express-validator';


export default async function rental(req, res) {
    const {method} = req;
    const {client} = await connectDb();
    const search = req.query.search || "";
    const is_rental = req.query.is_rental || "";
    if (method === 'GET') {
        try {
            const sql = `
                SELECT DISTINCT a.*,
                                p.*,
                                i.*
                FROM address a
                         JOIN properties p ON a.id = p.address_id
                         JOIN property_images i ON p.id = i.property_id
                WHERE 1 = 1
                    ${search && ` AND (a.city ILIKE '${search}%' OR a.zip_code ILIKE '${search}%' OR a.address_line_1 ILIKE '${search}%' OR a.country ILIKE '${search}%' OR a.state ILIKE '${search}%')`} ${is_rental && ` AND p.is_rental = ${is_rental}`}
                ORDER BY p.price ASC;
            `;
            const {rows} = await client.query(sql);
            res.status(200).json({
                status: "success",
                message: `${rows.length} properties found`,
                data: {
                    rows
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } finally {
            client.release();
        }
    } else if (method === "POST") {
        const {title, description, address_id, price, currency, is_rental} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            const sql = `
                INSERT INTO properties (title, description, address_id, price, currency, is_rental)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `;
            const {rows} = await client.query(sql, [title, description, address_id, price, currency, is_rental]);
            res.status(201).json({
                status: "success",
                message: "Property created",
                data: {
                    rows
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        } finally {
            client.release();
        }
    } else {
        res.status(405).json({message: "Method not allowed"});
    }
}