import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Company, User } from '../../../../models';
import {comparePassword,signToken} from '../../../../utils';
import { IUser } from '../../../../interfaces';


type Data = { message: string } | {
    token: string;
    company: {
        email: string;
        name_company: string;
    
    };
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   
      switch(req.method){
         case 'POST':
            return loginCompany(req,res);
        default:
            return res.status(400).json({message : 'Bad Request'})  ; 
      }
    
   
}

const loginCompany = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { phone = '', password = ''  } = req.body;

    await db.connect();
    const company = await Company.findOne({ phone });
    await db.disconnect();

    if ( !company ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - EMAIL' })
    }
    
    if ( !comparePassword( password, company.password! ) ) {
        return res.status(400).json({ message: 'Correo o contraseña no válidos - Password' })
    }

    const { _id,email, name_company } = company;

    const token = signToken( _id, email );

    return res.status(200).json({
        token, //jwt
        company: {
            email,name_company
        }
    })
}
