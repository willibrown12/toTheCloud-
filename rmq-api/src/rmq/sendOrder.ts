#!/usr/bin/env node



//@ts-nocheck
var amqp = require('amqplib/callback_api');
import { OrderPayloadType } from "../sendOrder";
import { generateOrderId } from "../sendOrder/handlers/generateOrderId";


export function sendToQueue(paramToSend:OrderPayloadType){

amqp.connect('amqp://192.168.1.100:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    const  queue = 'order_queue';
    
    const msg = getMessage(paramToSend);
    
    

    channel.assertQueue(queue, {
      durable: true,
      arguments: { 'x-max-priority': 1 }
    });
   
    
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
      persistent: true,
      priority: paramToSend.priority || 0 
    });
    console.log(" [x] Sent '%s'", msg);
  });

}
);

function getMessage(p:OrderPayloadType) {
  return {
      messageId: p.turn,
      payload: p.package,
      timestamp: new Date().toISOString(),
  };
}




}


