import { Database } from "./database.js"
import {randomUUID} from 'node:crypto'
import {buildRoutePath} from "./utils/build-route-path.js"
import { validateBody } from "./middlewares/validate-body.js"
import { returnFormatedDate } from "./utils/return-formated-date.js"
import { validateId } from "./middlewares/validate-id.js"

let db = new Database

export const routes = [
    {
        method: 'POST',
        url: buildRoutePath('/tasks'),
        handler: (req, res) => {
            validateBody(req, res)

            if(req.validateBody){
                const data = req.body
                const completed_at = null
                const created_at = returnFormatedDate()
                const updated_at = returnFormatedDate()
                db.insert('tasks', {id: randomUUID(), ...data, completed_at, created_at, updated_at})
                return res.writeHead(201).end()
            }

        }
    },
    {
        method: 'GET',
        url: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const searchParams = req.searchParams ? req.searchParams : null
            let tasks = db.select('tasks', searchParams)
            return res.end(JSON.stringify(tasks))

        }
    },
    {
        method: 'PUT',
        url: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            validateId('tasks', req, res)
            if(req.validateId){
                const id = req.params.id
                
                if (!req.body.title && !req.body.description) {
                    return res.writeHead(400).end(JSON.stringify({ erro: "'title' e/ou 'description' são obrigatórios" }))
                }
                const {title, description} = req.body
                const updated_at = returnFormatedDate()
                db.update('tasks', id, {title, description, updated_at})
                return res.writeHead(204).end()
            }
            
        }
    },
    {
        method: 'PATCH',
        url: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            validateId('tasks', req, res)
            if(req.validateId){
                const id = req.params.id
                const completed = req.taskCompleted
                db.update('tasks', id, {completed_at: completed ? null : returnFormatedDate()})
                
                return res.writeHead(204).end()
            }
            
        }
    },
    {
        method: 'DELETE',
        url: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            validateId('tasks', req, res)
            if(req.validateId){
                const {id} = req.params
                db.delete('tasks', id)
                return res.writeHead(204).end()
            }
        }
    },

]