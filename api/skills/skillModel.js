import { Schema,mongoose} from "mongoose";

const skillsSchema = new Schema({
    name:{type:String,requied:true}
})

const skill= mongoose.model('skills',skillsSchema);
export default skill;