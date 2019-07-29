import { Router, Response } from 'express';

// import * as Validations from './validation';
// import Services from './service';
import { IRequest, getErrorResponse } from '../mainModels';
import { IUser } from '../models/Users';
import APIError from '../../services/APIError';
// import { IAdmin } from '../../schemas/admin/model';
import jwtValidation from '../jwtValidation';
import Services from "../file/service";
import * as multer from "multer";
const upload = multer({ dest: 'uploads/' });
class FileRoutes {
    public router = Router();

    constructor() {

        this.routes();
    }

    private routes = () => {
        this.router.post('/file', jwtValidation.validateUser, upload.single('statement'), this.createFile);
    };
    private createFile = async (req: IRequest<IUser>, res: Response)=>{
        try {
            const response = await Services.createFile(req.file.filename, req.body.messageId);
            res.send(response);
        } catch (e) {
            new APIError(e, 500, 'CreateFile function in auth/service.ts');
            res.status(500).send(getErrorResponse());
        }
    }
}

export default new FileRoutes().router;