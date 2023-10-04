import type { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/db';
import { IUser } from '../../../../interfaces';
import { db } from '../../../../database';
import { User } from '../../../../models';


type Data = { message: string } | IUser;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req,res);
        default:
            return res.status(400).json({message : 'bad request'});    
    }
}

const registerUser= async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {name,phone,email,password,ocupation} = req.body;
    console.log(name,phone,email,password,ocupation);

     await db.connect();
      const user = await User.create({
         name,
         phone,
         email,
         password,
         ocupation
      });
      await user.save();
     await db.disconnect();

    return res.status(200).json(user);
}
