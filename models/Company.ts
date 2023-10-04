import { ICompany, IUser } from '../interfaces';
import mongoose, {Schema,model,Model} from 'mongoose';


const companySchema = new Schema({
    name : {type:String,required:true},
    phone : {type : String,required : true,unique : true},
    email : {type :String, required : true, unique:true},
    password : {type :String, Option:{
        minlength : 4
    }},
    name_company : {type:String,require : true}
},{
    timestamps : true
});

const Company: Model<ICompany> = mongoose.models.Company || model('Company',companySchema);


export default Company;