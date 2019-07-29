import * as jwt from 'jsonwebtoken';

// import AdminSchema from '../schemas/admin';

import APIError from '../services/APIError';
import mainConfig from '../env';
import { token } from 'morgan';
import { getResponse, IResponseModel, getErrorResponse } from './mainModels';

import { Request, Response, NextFunction } from 'express';
import { IRequest } from './mainModels';
import { roleEnum } from '../constants/enums';
// import User from "../models/Users"
import { IUser } from './models/Users';
import { IAdmin } from '../schemas/admin/model';
import {IUserDocument} from "../schemas/user/model";
import * as mysql from "mysql";
// import Device from '../models/Device';
const connection = mysql.createConnection({
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

const createJwtValidation = (userTypes: number[]) => {
    return async (req: IRequest<IUser | IAdmin>, res: Response, next: NextFunction) => {
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) return res.sendStatus(401);
            const token = bearerToken;
            jwt.verify(token, mainConfig.JWT_SECRET, async (error, dtls: any) => {
                console.log(dtls);
                if (error) {
                    new APIError('UNAUTHORIZED', 401);
                    return res.sendStatus(401);
                }
                if (!userTypes.includes(dtls.role)) {
                    new APIError('UNAUTHORIZED', 401);
                    return res.sendStatus(401);
                }
                if (dtls.role === roleEnum.user) {
                    const user = await connection.query(`SELECT * FROM users WHERE id = ?`, [dtls._id], (err, response) => {

                        // console.log(dtls.name);
                        // console.log(response[0].name);
                        // if (response[0].name !== dtls.name) {
                        //     new APIError('UNAUTHORIZED', 401);
                        //     return res.sendStatus(401);
                        // }
                        req.user = response;
                        return next();

                    });
                }
                else {
                    const admin = connection.query(`SELECT * FROM users WHERE id = ?`, [dtls.id], (err,response)=>{
                        if (!admin) {
                            new APIError('UNAUTHORIZED', 401);
                            return res.sendStatus(401);

                        }
                        req.user = response;
                        return next();
                    });

                }
            })

        }
        catch (err) {
            new APIError(err.message ? err.message : 'INTERNAL SERVER ERROR', 500);
            return res.sendStatus(500);
            }
        }
    };
export default {
    validateUser: createJwtValidation([roleEnum.admin, roleEnum.user]),
    validateAdmin: createJwtValidation([roleEnum.admin])

};

interface IJwtDetails {
    _id: string;
    deviceId: string;
    role: number;
    iat: number;
    exp: number;
}