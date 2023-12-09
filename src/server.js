import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-params.js"

const server = http.createServer(async(req, res) => {
    const {method, url} = req   

    await json(req, res)

    const route = routes.find((route) => route.method == method && route.url.test(url))

    if(route){

        const routeParams = req.url.match(route.url)
        const {query} = routeParams.groups

        req.params = {...routeParams.groups}
        req.searchParams = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()  

})

server.listen(3000, () => {
    console.log("Rodando na porta 3000!")
})