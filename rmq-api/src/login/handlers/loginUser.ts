import { loginType } from "..";
import { getConnection } from "../../database/connection"






type loginRoleType = { authentication: boolean, role?: string, full_name?: string, id?: number }

export async function loginUser(user: loginType): Promise<loginRoleType> {

    const connection = await getConnection();
    const query = `SELECT * FROM rabbitOrder.users WHERE email =? and password =?`
    const  [rows]: any = await connection?.execute(query, [user.email.toLowerCase(),user.password])
   

    const result = rows as Array<any>;
    if (result.length === 0) return { authentication: false, };


    return { 
        authentication: true, 
        full_name: result[0].full_name, 
        id: result[0].id
    };;
}

