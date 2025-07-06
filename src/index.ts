import { Kafka } from "kafkajs";

//create kafka instance
const kafka = new Kafka({
  clientId: "my-app", 
  brokers: ["localhost:9092"] //kafka port 
})

//create producers
const producer = kafka.producer();

//create consumer 
const consumer = kafka.consumer({groupId: "my-app3"});


async function main() {
  
  //connect producer 
  await producer.connect();
  //send message to some topic
  await producer.send({
    topic: "quickstart-events",
    messages: [{
      value: "hi there"
    }]
  })

  //create consumer
  await consumer.connect();
  //subscribe to topic
  await consumer.subscribe({
    topic: "quickstart-events", fromBeginning: true
  })
  //run consumer
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message?.value?.toString(),
      })
    },
  })
}


main();