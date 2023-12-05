// Nesse arquivo, deve ser feito a leitura do CSV e para cada linha, realize uma requisição para a rota POST - /tasks, passando os campos necessários.

// Recomendação de implementação:
// Semelhante ao que fizemos no [stream-http-server.js](https://github.com/rocketseat-education/ignite-nodejs-01-fundamentos-nodejs/blob/main/streams/stream-http-server.js) utilizando o `for await`, também é possível fazer com o `parse` da lib informada acima. (Lembre-se de pular a primeira linha do CSV)

import fs from 'fs';
import { parse } from 'csv-parse';

let {pathname} = new URL('lote-tasks.csv', import.meta.url)
console.log("pathname", pathname)

const processFile = async () => {
  const records = [];
  const parser = fs
    .createReadStream(pathname)
    .pipe(parse());
  for await (const record of parser) {
    console.log("record", record)
    records.push(record);
  }
  return records;
};

(async () => {
    const records = await processFile();
    // console.log("DADOS", records);
  })();