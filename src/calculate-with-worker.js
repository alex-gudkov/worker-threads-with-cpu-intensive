const { fibonacci } = require('./fibonacci');
const { workerData, parentPort } = require('node:worker_threads');

const result = fibonacci(workerData);

parentPort.postMessage(result);
