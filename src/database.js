import fs from 'node:fs/promises'
let {pathname} = new URL('db.json', import.meta.url)

export class Database{
    #database = {}

    constructor(){
        fs.readFile(pathname, 'utf8').then((data) => {
            return this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(pathname, JSON.stringify(this.#database))
    }

    select(table, searchParams=null){
        const data = this.#database[table] ?? []

        let filter = data.filter((row) => {
            
            for(let key in searchParams){
                return row[key].toLowerCase().includes(searchParams[key].toLowerCase())
            }
        })

        if(!searchParams || !filter.length){
            return data
        }

        return filter
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    delete(table, id){
        const index = this.#database[table].findIndex(user=> user.id == id)

        if(index > -1){
            this.#database[table].splice(index, 1)
            this.#persist()
        }
    }

    update(table, id, data){
        const row = this.#database[table].find(user=> user.id == id)
        const index = this.#database[table].findIndex(user=> user.id == id)

        if(index > -1){
            this.#database[table][index] = {...row, ...data}
            this.#persist()
        }
    }
}