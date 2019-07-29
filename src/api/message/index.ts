import { Router, Response } from 'express';

// import * as Validations from './validation';
// import Services from './service';
import { IRequest, getErrorResponse } from '../mainModels';
import { IUser } from '../models/Users';
import APIError from '../../services/APIError';
// import { IAdmin } from '../../schemas/admin/model';
import jwtValidation from '../jwtValidation';
import Services from "../message/service";
import * as WebSocket from "ws";
import {string} from "joi";

class MessageRoutes {
    public router = Router();

    constructor() {

        this.routes();
    }

    private routes = () => {
        this.router.post('/message', jwtValidation.validateUser, this.createMessage);
    };
    private createMessage = async (req: IRequest<IUser>, res: Response)=>{
        try {


            const response = await Services.createMessage(req.body.message, req.body.chatId);
            res.send(response);
        } catch (e) {
            new APIError(e, 500, 'CreateChat function in auth/service.ts');
            res.status(500).send(getErrorResponse());
        }
    }
}

export default new MessageRoutes().router;