import fs from 'fs';
import { parse } from 'csv-parse';

let {pathname} = new URL('lote-tasks.csv', import.meta.url)

const processFile = async () => {
  const records = [];
  const parser = fs
    .createReadStream(pathname)
    .pipe(parse());
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

(async () => {
    const tasks_complete = await processFile();

    const tasks = tasks_complete.map((task) => {
      const keys = tasks_complete[0]
      let arr_obj = []

      keys.forEach((key, index) => {
        let arr = [key, task[index]]
        arr_obj.push(arr)
      });

      const obj = Object.fromEntries(arr_obj);

      return obj
    })

    for(let i = 0; i < tasks.length; i++){
      let task = tasks[i]
      if(i > 0){
        let resp = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          body: JSON.stringify(task)
        })
      }
      
    }
    
  })();