import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import {User } from '../../../../models';
import {comparePassword,signToken} from '../../../../utils';
import { IUser } from '../../../../interfaces';


type Data = { message: string } | {
    token: string;
    user: {
       name:string;
        email: string;
       
    
    };
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
      switch(req.method){
         case 'POST':
            return loginPerson(req,res);
        default:
            return res.status(400).json({message : 'Bad Request'})  ; 
      }
    
   
}

const loginPerson = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { phone = '', password = ''  } = req.body;

    await db.connect();
    const user = await User.findOne({ phone });
    await db.disconnect();

    if ( !user ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - EMAIL' })
    }
    
    if ( !comparePassword( password, user.password! ) ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - Password' })
    }

    const { _id,name,email} = user;

    const token = signToken( _id, email );

    return res.status(200).json({
        token, //jwt
        user: {
            name,
            email
        }
    })
}
