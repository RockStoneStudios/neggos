import { IUser } from '../interfaces';
import mongoose, {Schema,model,Model} from 'mongoose';


const userSchema = new Schema({
    name : {type:String,required:true},
    phone : {type : String,required : true, unique:true},
    email : {type :String, required : true, unique:true},
    password : {type :String, Option:{
        minlength : 4
    }},
    ocupation : {type:String,require : true}
},{
    timestamps : true
});

const User: Model<IUser> = mongoose.models.User || model('User',userSchema);


export default User;