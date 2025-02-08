import { getConnection } from "../../database/connection";





export async function findPackage(number: string): Promise<string> {

    const connection = await getConnection();
    const query = `SELECT 
    *                
FROM 
    rabbitOrder.package
JOIN 
    rabbitOrder.customers
ON 
    rabbitOrder.package.customer_Id = rabbitOrder.customers.id
WHERE 
    rabbitOrder.customers.phone_number = ? 
    AND rabbitOrder.package.status = "Pending"`

    const foundPackage = await connection?.execute(query, [number])

    // @ts-ignore
    const result: Array<any> = foundPackage?.[0]
    if (result.length === 0) return "no package found" ;
    return  result[0].id ;
}
