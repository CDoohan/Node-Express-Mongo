const http = require('http')
const fs = require('fs')
const path = require('path')


const hostname = "localhost";
const port = "3001";

const server = http.createServer((req,res) => {
    console.log("Request for " + req.url + ' by method '+ req.method);

    if ( req.method == 'GET' ){

        var fileUrl;

        if( req.url == '/' ){
            fileUrl = '/index.html';
        }else if (req.url == '/about'){
            fileUrl = '/aboutus.html';
        }
        else{
            fileUrl = req.url;
        }

        var filePath = path.resolve('./public'+ fileUrl);
        const fileExt = path.extname(filePath);

        if( fileExt == '.html' ){
            fs.exists(filePath, (exists) => {
                if( !exists ){
                    // VERIFICANDO SE O ARQUIVO EXISTE
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: '+ filePath +' not found </h1></body></html>');

                    return
                }else{
                    
                    res.statusCode = 202;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                }
            })
        }else{
            // VERIFICANDO SE O ARQUIVO É HTML
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: '+ filePath +' not HTML file </h1></body></html>');

            return
        }

    }else{
        // VERIFICANDO SE O MÉTODO É SUPORTADO PARA O ENDPOINT
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: '+ req.method +' not supported </h1></body></html>');

        return
    }

    // EXEMPLO
    // res.statusCode = 200;SETANDO O STATUS CODE DO RESPONSE COMO 200(OK).
    // res.setHeader('Content-Type', 'text/html');RESPONSE BODY TERÁ UM RESPONSE HTML COMO RESPOSTA.
    // res.end('<html><body><h1>Hello World</h1></body></html>');TERMINO DA RESPOSTA ONDE IRÁ ENVIAR O CONTEUDO.
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})