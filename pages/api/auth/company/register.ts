import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/db';
import { ICompany, IUser } from '../../../../interfaces';
import { db } from '../../../../database';
import { Company, User } from '../../../../models';


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
  

     await db.connect();
      const company = await Company.create({
         name,
         phone,
         email,
         password,
         name_company
      });
      await company.save();
     await db.disconnect();

    return res.status(200).json(company);
}
