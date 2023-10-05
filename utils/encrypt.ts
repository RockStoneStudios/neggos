import bcrypjs from 'bcryptjs';



export const encryptPassword = (password:string):string=>{
    return bcrypjs.hashSync(password);
}

export const comparePassword = (password:string,hashedPassword:string):boolean => {
    return  bcrypjs.compareSync(password,hashedPassword)
}

