const fs = require('fs');
const incorrectFileName = '';

function doAsyncTaskPromise(path) {
  console.log('Вызвана функция doAsyncTaskCallback');

  fs.promises.readFile(path, { encoding: 'utf-8' }).then((result) => {
    console.log(`Результат чтения файла ${result}`);
    console.log('Функция doAsyncTaskCallback успешно завершена');
  })
  .catch((err)=>{
    console.log(`Произошла ошибка: ${err.name} ${err.message}`)
  });
}
doAsyncTaskPromise(incorrectFileName);