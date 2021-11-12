'use strict';

const faker = require('faker');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});
const sns = new AWS.SNS();
const sqs = new AWS.SQS();
const queueArn = 'arn:aws:sqs:us-west-2:138795499469:packages.fifo';
const topic = 'arn:aws:sns:us-west-2:138795499469:pickup.fifo';

const send = async (groupId, payload) => {
  console.log(payload);
  return await sqs
    .sendMessage({
      MessageGroupId: `group-${groupId}`,
      MessageDeduplicationId: `m-${groupId}-${faker.datatype.uuid()}`,
      MessageBody: `${payload}`,
      QueueUrl: 'https://sqs.us-west-2.amazonaws.com/138795499469/packages.fifo'
    }).promise();
}

const main = async () => {
  try {
    const payload = {
      orderId: faker.datatype.uuid(),
      customer: faker.name.findName(),
      VendorId: queueArn,
      Message: 'No message',
      TopicArn: topic 
    };
    let data = await send('A', payload)
    console.log(JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
main();

// sns.publish(payload).promise() 
//   .then(data => {
//     console.log(data);
//   })
//   .catch(e => {
//     console.log(e);
//   });