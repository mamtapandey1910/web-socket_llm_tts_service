First of all add **OPENAI_API_KEY** in the config file config/config.env

Context - I have created this application using raw socket and not any other framework for streaming. I have used customise Queue for handling streaming data because openai generate data in chunks. So I have created a queue to store those chunks and stream it to the client.

**The purpose of creating and streaming chunks is to reduce the latency between openai response and client receive. So instead of waiting for whole response from openai I have streamed it to client in chunks and that reduced the latency and gave better user experience.**

how to run the application?
prerequisites:

1. Node.js installed on your machine.
2. Has An OpenAI API key.
3. clone this basic repository of the frontend- https://github.com/mamtapandey1910/web-socket_llm_tts_frontend
4. Navigate to the frontend project directory and run "npm install" to install the dependencies.
5. Start the frontend server using "npm start".
   Make sure the frontend is running on port 3000.

   Steps to run:

6. Clone the repository to your local machine.
7. Navigate to the project directory.
8. Install the dependencies using "npm install".
9. Create a config folder in the root directory and inside that create a config.env file.
10. Add your OpenAI API key in the config.env file as follows
    OPENAI_API_KEY=your_openai_api_key_here
11. Start the server using "npm start".
    for development mode you can use "npm run dev" which will use nodemon to restart the server on file changes.

## Folder Structure

│ ├── agentConfig/
│ │ └── openaiConfig.ts // Added OpenAI configuration here
│ ├── orchestrateServices/
│ │ └── streamLLMtoTTS.ts
│ ├── server/
│ │ ├── connection.ts
│ │ ├── routeMessage.ts
│ │ └── wsServer.ts
│ ├── services/
│ │ ├── llmService.ts
│ │ └── ttsService.ts
│ ├── sessions/
│ │ └── sessionStore.ts
│ ├── types/
│ │ ├── agentConfigType/
│ │ │ └── openaiConfigType.ts
│ │ ├── llmServiceType/
│ │ │ └── llmServiceType.ts
│ │ ├── orchestrateServicesType/
│ │ │ └── streamLLMtoTTSType.ts
│ │ ├── serverTypes/
│ │ │ ├── connectionTypes.ts
│ │ │ └── routeMessageType.ts
│ │ ├── sessionType/
│ │ │ └── sessionStoreType.ts
│ │ └── utilTypes/
│ │ └── errorType.ts
│ └── utils/
│ ├── catchAsyncError.ts
│ ├── error.ts
│ ├── queue.ts
│ ├── segmentText.ts
│ └── sendMessage.ts

explaination of folders:

- agentConfig/: Contains configuration settings for the OpenAI API.
- orchestrateServices/: Contains logic to orchestrate the flow of data between LLM and TTS services.
- server/: Contains the WebSocket server implementation and connection handling.
- services/: **Contains the LLM and TTS service implementations. I have created separate services for LLM and TTS to keep the code modular and maintainable. LLM service generates texts in chunks so I have created a queue to store those chunks and stream it to the client. I have created a buffer string to avoid sending every small chunks to the text-to-speech service. the buffer will accumulate the chunks until it reaches a certain size before sending it to the TTS service. This reduces the number of requests made to the TTS service and improves overall efficiency.**

- llmService.ts: Handles communication with the OpenAI API to generate text based on user prompts.
- ttsService.ts: Handles communication with the TTS service to convert text segments into speech

- sessions/: Manages user sessions and their associated data. This need to be improved for production use.
- types/: Contains TypeScript type definitions for various parts of the application.
- utils/: Contains utility functions used throughout the application.
  error handling has been done using custom error class and catchAsyncError utility to handle asynchronous errors in the application.
  **queue.ts** contains the custom queue implementation for handling streaming data.
  **segmentText.ts** contains logic to split the buffered sentences into smaller segments before sending them to the TTS service. This is important because sending every chunk to exhausts the TTS service quickly and also increases the latency. So I have created a function to segment the sentences into smaller parts based on punctuation and length.
