import { Router, Response } from 'express';

// import * as Validations from './validation';
import Services from './service';
import { IRequest, getErrorResponse } from '../mainModels';
import { IUser } from '../models/Users';
import APIError from '../../services/APIError';
// import { IAdmin } from '../../schemas/admin/model';
import jwtValidation from '../jwtValidation';

class AuthRoutes {
    public router = Router();

    constructor() {

        this.routes();
    }

    private routes = () => {
        this.router.post('/signin', this.signin);
        this.router.post('/login',  this.login);
        this.router.get('/getlist', jwtValidation.validateAdmin, this.getlist);
    };
private getlist = async(req: IRequest<IUser>, res: Response) => {
  try{
      const response = await Services.getlist();
      res.send(response);
  }
  catch(e){
      new APIError(e, 500, 'getList function in auth/service.ts');
      res.status(500).send(getErrorResponse());
  }
};
    private signin = async (req: IRequest<IUser>, res: Response) => {
        try {
            const response = await Services.signin(req.body.name);
            res.send(response);
        } catch (e) {
            new APIError(e, 500, 'Signin function in auth/service.ts');
            res.status(500).send(getErrorResponse());
        }
    };
private  login = async (req: IRequest<IUser>, res: Response)=>{
    try{
        const response = await Services.login(req.body.name);
        res.send(response);
    } catch (e) {
        new APIError(e, 500, 'Login function in auth/service.ts');
        res.status(500).send(getErrorResponse());
    }
   };
}

export default new AuthRoutes().router;