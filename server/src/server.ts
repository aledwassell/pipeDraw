import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message } from './model/message.model';

export class DrawServer {
    public static readonly PORT:number = 3000;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || DrawServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m: Message) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}

// class FlickrResource implements Flickr {
//     private flickrOptions: {
//         api_key: "5b9c096b7fc42039f5ffbe3738d0eeba",
//         secret: "5c926691d81a1f7e",
//         user_id: '157408260@N04'
//     };
//
//     private getPhotoSets (req, res): void {
//         res.send('something');
//         Flickr.tokenOnly(this.flickrOptions, function(error, flickr) {
//             flickr.photosets.getPhotos({
//                 photoset_id: '72157663434459275',
//                 user_id: flickr.options.user_id,
//                 page: 1,
//                 per_page: 20,
//                 extras: 'description, license, owner_name, icon_server, original_format, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_o'
//             }, function(err, results) {
//                 if(err){
//                     res.send(`There was an error ${err}`)
//                     return false;
//                 }
//                 res.send(results);
//             })
//         });
//     }
//         app.post('/sets', (req, res) => {
//         getPhotoSets(req, res)
//     });
// }






