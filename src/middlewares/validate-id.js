import { Database } from "../database.js";

let db = new Database()

export async function validateId(table, req, res){
    const id = req.params.id
    let rows = db.select(table, null)

    const index = rows.findIndex((row) => row.id == id)

    if(!id || index == -1){
        return res.writeHead(404).end(JSON.stringify({erro: "ID não encontrado"}))
    }else{
        req.validateId = true
    }

}