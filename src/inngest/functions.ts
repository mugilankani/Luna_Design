
import { createAgent, tool } from "langchain";
import { z } from "zod";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import {Sandbox} from "@e2b/code-interpreter"

import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },

  async ({ event, step }) => {

    const SandboxID = await step.run("get-Sandbox-ID", async () => {
        const sandbox = await Sandbox.create("vibe-next3");
        return sandbox.sandboxId;
    });

    // Create the Gemini model instance with API key from environment
    const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
    });

    const agent = createAgent({
    model: model,
    systemPrompt: "you are an expert in coding and understand the wrold class designs and the lauyout, create an react vite with tailwind css code snipt, just needed the code snipet, without any other explaination"
    });

  const  output  = await agent.invoke({
    messages: [{ role: "user", content: `create an code snipet for ${event.data.value}?` }],
  })

  const sandboxUrl = await step.run("get-sandbox-url", async () => {
    const sandbox = await getSandbox(SandboxID);
    const host = sandbox.getHost(3000);
    return `http://${host}`;
  });

    return { message: output, sandboxUrl };

  }
);
