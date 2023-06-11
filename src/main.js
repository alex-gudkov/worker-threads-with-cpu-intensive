const path = require('node:path');
const { fibonacci } = require('./fibonacci');
const { Worker } = require('node:worker_threads');

function calculateInMainThread(n) {
  return new Promise((resolve, reject) => {
    const begin = Date.now();

    try {
      const result = fibonacci(n);

      const end = Date.now();

      console.log('time:', end - begin);

      resolve(result);
    } catch (error) {
      console.error(error);

      reject(-1);
    }
  });
}

function calculateInOtherThread(n) {
  return new Promise((resolve, reject) => {
    const begin = Date.now();

    const worker = new Worker(path.join(__dirname, 'calculate-with-worker.js'), {
      workerData: n,
    });

    worker.once('message', (result) => {
      const end = Date.now();

      console.log('time:', end - begin);

      resolve(result);
    });

    worker.once('error', (error) => {
      console.error(error);

      reject(-1);
    });
  });
}

async function main() {
  const calculate = calculateInOtherThread;

  const begin = Date.now();

  const results = await Promise.all([
    calculate(40),
    calculate(40),
    calculate(40),
    calculate(40),
    calculate(40),
  ]);

  const end = Date.now();

  console.log('results:', results);
  console.log('total time:', end - begin);
}

main();
