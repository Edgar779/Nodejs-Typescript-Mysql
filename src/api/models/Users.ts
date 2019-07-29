import mainConfig from '../../env';


import { strict, string } from 'joi';




export interface IUser extends Document {
    name: String,
    verificationCode: String
}



// const a = mongoose.model("User", UserSchema);

// export default a;