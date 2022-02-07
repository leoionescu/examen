import express, { json } from 'express';
import { intitialize } from './repository.mjs';
import routes from './routes.mjs';
import cors from 'cors';
import { join, resolve } from 'path';

const app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.use(cors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    optionsSuccessStatus: 200
}))

app.use(json())

app.use(express.static(join(resolve(), 'public')))

app.use('/api', routes)


app.listen(process.env.PORT || 8081, async () => {
    try {
        await intitialize()
    } catch (err) {
        console.error(err)
    }
})