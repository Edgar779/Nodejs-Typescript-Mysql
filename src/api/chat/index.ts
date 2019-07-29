import { Router, Response } from 'express';

// import * as Validations from './validation';
// import Services from './service';
import { IRequest, getErrorResponse } from '../mainModels';
import { IUser } from '../models/Users';
import APIError from '../../services/APIError';
// import { IAdmin } from '../../schemas/admin/model';
import jwtValidation from '../jwtValidation';
import Services from "../chat/service";
class ChatRoutes {
    public router = Router();

    constructor() {

        this.routes();
    }

    private routes = () => {
        this.router.post('/createchat', jwtValidation.validateUser, this.createChat);
    };
    private createChat = async (req: IRequest<IUser>, res: Response)=>{
        try {
            console.log(req.user);
            const response = await Services.createChat(req.body.name, req.user);
            res.send(response);
        } catch (e) {
            new APIError(e, 500, 'CreateChat function in auth/service.ts');
            res.status(500).send(getErrorResponse());
        }
    }
}

export default new ChatRoutes().router;