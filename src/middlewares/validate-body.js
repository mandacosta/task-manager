export async function validateBody(req, res){
    const title = req.body.title
    const description = req.body.description

    if(!title || !description){
        return res.writeHead(400).end(JSON.stringify({erro: "Devem ser fornecidos 'title' e 'description'"}))
    }else{
        req.validateBody = true
    }
}