import * as express from 'express';

import AuthRoutes from './auth';
import ChatRoutes from './chat';
import MessageRoutes from './message';
import FileRoutes from './file';
class Routes {

    public router = express.Router();

    constructor() {
        this.routes();
    }

    private routes = () => {
        this.router.use('/auth', AuthRoutes);
        this.router.use('/chat', ChatRoutes);
        this.router.use('/message', MessageRoutes);
        this.router.use('/file', FileRoutes);

    }
}

export default new Routes().router;