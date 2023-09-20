import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ConversationalRetrievalQAChain } from "langchain/chains";

export async function createConversationChain(vectorObj) {
  try {
    console.log("inside create chain", vectorObj);
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-16k",
      temperature: 0.2,
      openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(
      llm,
      vectorObj.asRetriever(),
      {
        memory: new BufferMemory({
          memoryKey: "chat_history", // Must be set to "chat_history"
        }),
      }
    );
    console.log("chain", chain);
    return chain;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to ingest your data");
  }
}
