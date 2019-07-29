import * as express        from 'express';
import * as cors           from 'cors';
import * as morgan         from 'morgan';
import * as helmet         from 'helmet';
import * as mysql          from 'mysql';
// @ts-ignore
import * as fileUpload     from 'express-fileupload';
// import * as methodOverride from 'method-override';

import * as bodyParser from "body-parser";
// import APIError from './services/APIError';
import routes from   './api'

// import ImageRoutes from './api/image';

// import { getErrorResponse } from './api/mainModels';
import mainConfig from './env';

class Server {
    public app = express();

    constructor() {
        this.config();
        this.routes();
    }

    private config () {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        this.app.use(bodyParser.json({limit:'50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
        /** Enabling cross-origin resource sharing */
        this.app.use(cors());
        // this.app.use('/auth', require('./api/auth'));
        /** Enabling middleware that parses json */
        this.app.use(express.json());
        /** Enabling middleware that parses urlencoded bodies */
        this.app.use(express.urlencoded({ extended: false }));
        /** Enabling method-override */
        // this.app.use(methodOverride());
        /** Enabling setting various HTTP headers for security */
        this.app.use(helmet());
        /** Logging api calls */
        if (mainConfig.NODE_ENV !== 'test') this.app.use(morgan('dev'));
        /** Opening media folder */
        // this.app.use('/', express.static(mainConfig.MEDIA_PATH));
        // const swaggerDoc = require('../swagger.json');
        // this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        /** Add media folder by redis */
        // this.app.use('/image', ImageRoutes);
    }

    private routes () {

        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.send('Server is working');
        });
        this.app.use('/api', routes);

        // this.app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
        //   if (!(err instanceof APIError)) {
        //     new APIError(err, 500, 'Unknown error');
        //   }
        //   res.status(500).send(getErrorResponse());
        // });

        // this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        //   res.status(404).json({
        //     success: false,
        //     message: 'API not found'
        //   });
        // });

    }
}

export default new Server().app;