First of all add **OPENAI_API_KEY** in the config file config/config.env

Context - I have created this application using raw socket and not any other framework for streaming. I have used customise Queue for handling streaming data because openai generate data in chunks. So I have created a queue to store those chunks and stream it to the client.

**The purpose of creating and streaming application is to reduce the latency between openai response and client receive. So instead of waiting for whole response from openai I have streamed it to client in chunks and that reduced the latency and gave better user experience.
**
