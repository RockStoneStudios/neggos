import jwt from 'jsonwebtoken';


export const signToken = (_id:any,email:string) => {
    if(!process.env.TOKEN_SECRET) {
        throw new Error('No hay token secret')
    }
   return  jwt.sign(
       //payload 
        {_id,email},
        process.env.TOKEN_SECRET,
        //Options
        {
            expiresIn : '30d'
        }
    )
}
