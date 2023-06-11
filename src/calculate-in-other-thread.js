const { workerData, parentPort } = require('node:worker_threads');
const { fibonacci } = require('./fibonacci');

const { n } = workerData;

const result = fibonacci(n);

parentPort.postMessage(result);
