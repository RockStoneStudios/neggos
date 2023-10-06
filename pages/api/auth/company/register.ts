import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/db';
import { ICompany, IUser } from '../../../../interfaces';
import { db } from '../../../../database';
import { Company, User } from '../../../../models';
import { encryptPassword } from '../../../../utils';

type Data = { message: string } | ICompany;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerCompany(req,res);
        default:
            return res.status(400).json({message : 'bad request'});    
    }
}

const registerCompany= async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {name,phone,email,password,name_company} = req.body;
  
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

    if ( name_company.length < 2 ) {
        return res.status(400).json({
            message: 'El nombre debe de ser de 2 caracteres'
        });
    }

     await db.connect();
      const company = await Company.create({
         name,
         phone,
         email ,
         password: encryptPassword(password),
         name_company
      });
      await company.save();
     await db.disconnect();

    return res.status(200).json(company);
}
