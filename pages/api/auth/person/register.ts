import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/db';
import { IUser } from '../../../../interfaces';
import { db } from '../../../../database';
import { User } from '../../../../models';

import {isValidEmail,encryptPassword} from '../../../../utils'

type Data = { message: string } | IUser;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log('entre')
    switch (req.method) {
        case 'POST':
            return registerUser(req,res);
        default:
            return res.status(400).json({message : 'bad request'});    
    }
}

const registerUser= async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { name = '', phone = '', email = '', password= '', ocupation= '' } = req.body;
    console.log(req.body);
    if ( phone.length < 10 ) {
        return res.status(400).json({
            message: 'El numero celular debe tener minimo 10 caracteres'
        });
    }
    if ( password.length < 4) {
        return res.status(400).json({
            message: 'La contraseña debe de ser de 5 caracteres'
        });
    }
    
    if ( name.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }
    
    if ( ocupation.length < 3 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }
    
    console.log('hasta aca ');
    if ( !isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }
    
    await db.connect();
    const user = await User.findOne({ email });
   console.log(user);
    if ( user ) {
        return res.status(400).json({
            message:'No puede usar ese correo'
        })
    }

    const newUser = new User({
        name : name,
        phone: phone,
        email: email.toLocaleLowerCase(),
        password: encryptPassword( password ),
        ocupation : ocupation
      
    });
    return res.status(200).json(newUser);
}
