import { ICompany, IUser } from "../interfaces"
import Company from '../models/Company';


interface SeedData  {
    users: SeedUser[],
    company : SeedComapny[]
}

interface SeedUser {
   name:string;
   phone : string;
   email:string;
   password:string;
   ocupation : string;

}

interface SeedComapny {
    name:string;
    phone : string;
    email:string;
    password:string;
    name_company: string;
}

export const initialData : SeedData = {
    
    users : [
        {name : 'Jeison Castaño',phone : '3024330410',email:'jeisoncatano@gmail.com',password:'12345',ocupation:'Ceo'},
        {name : 'Omar Ortiz',phone : '3508436568',email:'omar@gmail.com',password:'12345',ocupation:'Ceo'},
    ],
    company : [
        {name : 'Bill Gates', phone : '3004647852', email : 'billgates@outlook.com',password : '12345',name_company: 'Microsoft'},
        {name : 'Elon Musk', phone : '3203347852', email : 'elonmusk@gmail.com',password : '12345',name_company: 'SpaceX'}
     ]    
    
}


