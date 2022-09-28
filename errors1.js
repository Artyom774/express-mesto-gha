const fs = require('fs');
const incorrectFileName = '';

function doSyncTask(path) {
  console.log('Вызвана функция doSyncTask');
  try {
    const result = fs.readFileSync(path, {encoding: 'utf-8'});
    console.log(`Результат чтения файла ${result}`);
  } catch(err) {
    console.log(`Произошла ошибка: ${err.name} ${err.message}`);
  }
  console.log('Функция doSyncTask успешно завершена');
}
doSyncTask(incorrectFileName);