
import { getResponse, IResponseModel, getErrorResponse, IRequest } from '../mainModels';
import  * as mysql from "mysql";
import * as WebSocket from "ws";
import {wss} from "../../index";
import {string} from "joi";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task"
});
connection.connect();
class MessageServices {

    public createMessage = async (messages: string, chatId: string) => {
// var mess: string;
//         wss.on('connection', async (ws: WebSocket) => {
//             ws.on('message', (message: string) => {
//                 console.log('received: %s', message);
//                 ws.send(`Hello, you sent -> ${message}`);
//                 mess = message;
//             });
//
//             ws.send('Hi there, I am a WebSocket server');
//         });
//         console.log(mess);

        connection.query(
            "INSERT INTO `messages`(`message`) VALUES (?)",
            [messages],
            function(error, results, fields) {
                if (error) throw error;
                connection.query(
                    "INSERT INTO `chat_messages`(`chat_id`,`message_id`) VALUES (?, ?)",
                    [chatId, results.insertId],
                    function(error, result, fields) {
                        if (error) throw error;

                    }
                );
            }
        );
        return getResponse(true, "successfully created")
    }
}

export default new MessageServices();