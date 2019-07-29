// import * as bcrypt from 'bcrypt';
// import { sendVerificationCodeViaSMS } from "../../services/sms-sender";
// import * as bcrypt from "bcrypt";
// import Users from "../../models/Users";
// import Device from "../../models/Device";
import { string } from "joi";
import * as jwt from "jsonwebtoken";
// import { IUser } from '../../schemas/user/model';
// import UserSchema   from '../../schemas/user';
// import { ILoginBody, ISendSmsBody, IVerifyBody, IChangePasswordBody } from './model';
import { getResponse, IResponseModel, getErrorResponse, IRequest } from '../mainModels';
import { query} from "../config/db";

import mainConfig from '../../env';
import { fileURLToPath } from "url";
// import { IDevice } from '../../models/Device/model';
// import { IUser } from '../../models/Users/model';
import { roleEnum } from "../../constants/enums";
// import admin from "../../schemas/admin";
// import { IAdmin } from "../../schemas/admin/model";
// import { IAdmin } from "../../schemas/admin/model";
// import { Model } from "mongoose";
// import { IAdmin } from "src/schemas/admin/model";
// import { LanguageEnum, UserRoleEnum } from '../../constants/enums';
// import { IAdmin } from '../../schemas/admin/model';
// import { sendVerificationCodeViaSMS } from '../../services/sms-sender';
import  * as mysql from "mysql";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task"
});
connection.connect();
class ChatServices {

    public createChat = async (name: string, user: any) => {
        connection.query(
            "INSERT INTO `chats`(`name`) VALUES (?)",
            [name],
            function(error, results, fields) {
                if (error) throw error;
                connection.query(
                    "INSERT INTO `user_chats`(`user_id`, `chat_id`) VALUES (?, ?)",
                    [user[0].id, results.insertId],
                    function(error, results, fields) {
                        if (error) throw error;

                    }
                );
            }
        );
        return getResponse(true, "successfully created")
    }
}

export default new ChatServices();