import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/db';
import { ICompany, IUser } from '../../../../interfaces';
import { db } from '../../../../database';
import { Company, User } from '../../../../models';
import { encryptPassword, isValidEmail, signToken } from '../../../../utils';

type Data = { message: string } |  {
    token: string;
    company: {
        email: string;
        name_company: string;
        phone: string;
    };
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerCompany(req,res);
        default:
            return res.status(400).json({message : 'bad request'});    
    }
}

const registerCompany= async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { name = '', phone= '',email = '', password = '', name_company= '' } = req.body;

    if ( password.length < 4 ) {
        return res.status(400).json({
            message: 'La contraseña debe de ser de 6 caracteres'
        });
    }

    if ( name.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }
    
    if ( !isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'El correo no tiene formato de correo'
        });
    }

    if ( name_company.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }
    
    
    
    await db.connect();
    const company = await Company.findOne({ email });

    if ( company ) {
        return res.status(400).json({
            message:'No puede usar ese correo'
        })
    }

    const newCompany = new Company({
        email: email.toLocaleLowerCase(),
        password: encryptPassword( password ),
        name,
        phone : phone,
        name_company : name_company
    });

    try {
        await newCompany.save({ validateBeforeSave: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Revisar logs del servidor'
        })
    }
   
    const { _id } = newCompany;

    const token = signToken( _id, email );

    return res.status(200).json({
        token, //jwt
        company: {
            email, 
            phone,
            name_company,
        }
    })

}
