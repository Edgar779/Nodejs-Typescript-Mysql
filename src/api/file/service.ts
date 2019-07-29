import { getResponse, IResponseModel, getErrorResponse, IRequest } from '../mainModels';
import  * as mysql from "mysql";
import * as WebSocket from "ws";
import server from "../../index";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task"
});
connection.connect();
class FileServices {

    public createFile = async (name: string, messageId: string) => {
        // recommended send with client site
        connection.query(
            "INSERT INTO `files`(`name`) VALUES (?)",
            [name],
            function(error, results, fields) {
                if (error) throw error;
                connection.query(
                    "INSERT INTO `message_files`(`message_id`,`file_id`) VALUES (?, ?)",
                    [messageId, results.insertId],
                    function(error, result, fields) {
                        if (error) throw error;

                    }
                );
            }
        );
        return getResponse(true, "successfully created")
    }
}

export default new FileServices();