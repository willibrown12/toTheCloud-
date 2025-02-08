import { query } from "express";
import { getConnection } from "../../database/connection";
import { log } from "console";



export async function getUserData(id: number) {
    const connection = await getConnection();
    const query = `SELECT full_name
FROM rabbitOrder.users
WHERE id = ?`


    const Vacations = await connection?.execute(query, [id])
    const result = Vacations?.[0]
    
    
    return result
}