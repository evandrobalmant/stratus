'use strict';

const app           = require('./app');
const serverless    = require('serverless-http');
const fs            = require('fs');
const path          = require('path');

const StaticFileHandler = require("serverless-aws-static-file-handler");
const clientFilesPath = (process.env.IS_OFFLINE) ? "dist/service/app/public/" : "app/public/";
const fileHandler = new StaticFileHandler(clientFilesPath);

const handler = serverless(app);

module.exports.run = async (event, context, _callback) => {
    let filePath = path.join(clientFilesPath, event.path);
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        event.pathParameters.proxy = event.path;
        return fileHandler.get(event, context);
    }
    return handler(event, context);
}
