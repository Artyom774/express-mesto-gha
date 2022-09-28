const fs = require('fs');
const incorrectFileName = '';

function doAsyncTaskCallback(path) {
  console.log('Вызвана функция doAsyncTaskCallback');

  fs.readFile(path, { encoding: 'utf-8' }, (err, result) => {
    if (err) {
      console.error(`Произошла ошибка: ${err.name} ${err.message}`);
      return;
    }
    console.log(`Результат чтения файла ${result}`);
    console.log('Функция doAsyncTaskCallback успешно завершена');
  });
}
doAsyncTaskCallback(incorrectFileName);