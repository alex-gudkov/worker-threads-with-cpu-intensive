const { Worker } = require('node:worker_threads');
const { join: pathJoin } = require('node:path');
const { fibonacci } = require('./fibonacci');

function calculateInMainThread(n) {
  return new Promise((resolve, reject) => {
    const t1 = Date.now();

    try {
      const result = fibonacci(n);

      const t2 = Date.now();

      console.log('time:', t2 - t1);

      resolve(result);
    } catch (error) {
      console.error(error);

      reject(-1);
    }
  });
}

function calculateInOtherThread(n) {
  return new Promise((resolve, reject) => {
    const t1 = Date.now();

    const worker = new Worker(pathJoin(__dirname, 'calculate-in-other-thread.js'), {
      workerData: {
        n,
      },
    });

    worker.once('message', (result) => {
      const t2 = Date.now();

      console.log('time:', t2 - t1);

      resolve(result);
    });

    worker.once('error', (error) => {
      console.error(error);

      reject(-1);
    });
  });
}

async function main() {
  // choose function to use for calculating
  const calculate = calculateInOtherThread;

  // position of fibonacci number to calculate
  const n = 40;

  const t1 = Date.now();

  const results = await Promise.all([
    calculate(n),
    calculate(n),
    calculate(n),
    calculate(n),
    calculate(n),
  ]);

  const t2 = Date.now();

  console.log('results:', results);
  console.log('total time:', t2 - t1);
}

main();
