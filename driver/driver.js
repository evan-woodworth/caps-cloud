'use strict';

const { Consumer } = require('sqs-consumer');

const queueUrl = 'https://sqs.us-west-2.amazonaws.com/138795499469/packages.fifo';
const consumer = Consumer.create({
  queueUrl: queueUrl,
  handleMessage: (payload) => {
    const data = JSON.stringify(payload)
    console.log(data);
  }
})

consumer.start();