// Importação de dependências
const app           = require('./app');
const serverless    = require('serverless-http');
const fs            = require('fs');
const path          = require('path');

// Configs para API Gateway responder arquivos binários
const StaticFileHandler = require("serverless-aws-static-file-handler");
const clientFilesPath = (process.env.IS_OFFLINE) ? "dist/service/app/public/" : "app/public/";
const fileHandler = new StaticFileHandler(clientFilesPath);

// Instância do projeto Serverless Framework com Express
const handler = serverless(app);

module.exports.run = async (event, context, _callback) => {
    // Verifica se a requisição é para um arquivo binário/estático
    let filePath = path.join(clientFilesPath, event.path);
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        event.pathParameters.proxy = event.path;
        return fileHandler.get(event, context);
    }
    global.event_path = (event.path.endsWith('/')) ? event.path : event.path+'/';
    
    // Senão: executa handler das rotas
    return handler(event, context);
}
