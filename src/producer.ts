import { kafka } from "./index";
import readline from "readline";

// create Kafka producer
const producer = kafka.producer();

// setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Enter message to publish to quickstart-events: "
});

async function main() {
  await producer.connect();
  rl.prompt();

  rl.on("line", async (input) => {
    if (input.trim().toLowerCase() === "exit") {
      await producer.disconnect();
      rl.close();
      return;
    }

    try {
      await producer.send({
        topic: "quickstart-events",
        messages: [{ value: input }],
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }

    rl.prompt(); // show the prompt again for next input
  });
}

main();
