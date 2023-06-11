const { fibonacci } = require('./fibonacci');
const { workerData, parentPort } = require('node:worker_threads');

const result = fibonacci(workerData.n);

parentPort.postMessage(result);
