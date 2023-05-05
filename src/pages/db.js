const {Pool} = require("pg");

const pool =
    new Pool({
        user: "postgres",
        host: "localhost",
        database: "rentals",
        password: "ender",
        port: 5432,
        max: 10, // maximum number of connections in the pool
        idleTimeoutMillis: 30000, // how long a connection can be idle before being closed
    });

export const connectDb = async () => {
    const client = await pool.connect();
    return {
        client,
        release: () => client.release(),
    };
};
