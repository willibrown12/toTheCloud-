#!/usr/bin/env node
//@ts-nocheck


export default async function getMessage() {
  const amqp = require('amqplib');
  const queue = 'order_queue';

  try {
    const connection = await amqp.connect('amqp://192.168.1.100:5672');


    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {
      durable: true,
      arguments: { 'x-max-priority': 1 }
    });

    channel.prefetch(1); // Ensure that only 1 message is sent to the consumer

    // Consume a single message
    const message = await channel.get(queue, { noAck: false });
    if (message) {
      const text = message.content.toString();
      console.log(" [x] Received '%s'", text);
      const seconds = text.split('.').length - 1;
      
      setTimeout(() => {
        
        console.log(" [x] Done");
        channel.ack(message);
     
      }, seconds * 1000);
    } else{  
      connection.close();
     }
if (message.content) {
  return JSON.parse(message.content.toString())
} else {
  return {messageId:"no turns"}
}
    
  } catch (err) {
    console.log(err);
  }
}
