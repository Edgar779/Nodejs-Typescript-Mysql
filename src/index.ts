import * as http     from 'http';

import app from './app';
import config from './env';
// import runSeed from './seed';
import mainConfig from './env';
import * as WebSocket from 'ws';
import {string} from "joi";
// import MessageRoutes from './src/api/message/index';


// listen on port
export const server = http.createServer(app).listen(config.PORT, () => {
    if (mainConfig.NODE_ENV !== 'test') console.log('Server started on port ' + config.PORT + ` in ${config.NODE_ENV} mode`);
});

export const wss = new WebSocket.Server({ server });

wss.on('connection', async (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    ws.send('Hi there, I am a WebSocket server');
});


export default server;