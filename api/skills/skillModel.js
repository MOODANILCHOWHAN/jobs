import { Schema} from "mongoose";

const skillsSchema = new Schema({
    name:{String,requied:true}
})

const skill= mongoose.model('skills',skillsSchema);
export default skill;