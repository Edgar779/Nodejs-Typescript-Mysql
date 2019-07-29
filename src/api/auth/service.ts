
import * as jwt from "jsonwebtoken";

import { getResponse, IResponseModel, getErrorResponse, IRequest } from '../mainModels';

import mainConfig from '../../env';

import { roleEnum } from "../../constants/enums";

import {connection, query} from "../config/db";
import * as WebSocket from "ws";

class AuthServices {
    public getlist = async () => {

        let qr = await query(
            "SELECT users.id as user_id, users.name as user_name, chats.id as chat_id, chats.name as chat_name, messages.id as message_id, messages.message as message, files.id as file_id, files.name as file_name FROM users LEFT JOIN user_chats ON users.id = user_chats.user_id LEFT JOIN chats ON chats.id = user_chats.chat_id LEFT JOIN chat_messages ON chats.id = chat_messages.chat_id LEFT JOIN messages ON messages.id = chat_messages.message_id LEFT JOIN message_files ON message_files.id = messages.id LEFT JOIN files ON files.id = message_files.file_id ORDER BY messages.created_date",
            []
        );
        return qr;


    };

    public signin = async (name: string) => {

       let insert = await query(
            "INSERT INTO `users`(`name`, `role`) VALUES (?, ?)",
            [name, "user"],
        );

       return getResponse(true, "successfully loged in")
    };

    public login = async (name: string)=>{
        let select = await query(
        `SELECT * FROM users WHERE name = ?`,
        [name]

    );
        // @ts-ignore
        let token = jwt.sign({ _id: select[0].id, name: name, role: roleEnum.user },
            mainConfig.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );
        return token;

    }
}

export default new AuthServices();