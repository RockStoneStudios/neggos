
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database';
import { Company, User } from '../../models';

type Data = {
    message :  string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV=== 'production'){
        return res.status(401).json({message : 'Ud no tiene permisos para ingresar a esta Api'});
    }
     await db.connect();
     await User.deleteMany();
     
     await User.insertMany(seedDatabase.initialData.users);
     await Company.deleteMany();    
     await Company.insertMany(seedDatabase.initialData.company);

     await db.disconnect();
      

    res.status(200).json({ message: 'Processo realizado correctamente' });

}