import { Kafka } from "kafkajs";

//create kafka instance
export const kafka = new Kafka({
  clientId: "my-app", 
  brokers: ["localhost:9092"] //kafka port 
})
