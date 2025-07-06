import {kafka} from "./index"


//create consumer 
const consumer = kafka.consumer({groupId: "my-app3"});


async function main() {
  

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