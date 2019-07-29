import * as mysql from "mysql";

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task"
});

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});


export const query = (query: string, args: any) => {
    return new Promise((resolve, reject) => {
        connection.query(query, args, function(error, response) {
            if (error) return reject(error);
            return resolve(response);
        });
    });
};
