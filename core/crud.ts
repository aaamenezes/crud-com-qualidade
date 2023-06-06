import fs from 'fs';
const DB_FILE_PATH = './core/db';

console.log(`1 >>> HELLO WORLD`);

function create(content: string) {
  fs.writeFileSync(DB_FILE_PATH, content);
}

create('vai cavalo');