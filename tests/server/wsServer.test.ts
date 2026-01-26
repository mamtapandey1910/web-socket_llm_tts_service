import { sockerServer } from "../../src/server/wsServer";

describe("startServer", () => {
  it("should start the WebSocket server", () => {
    const server = sockerServer(8080);
    expect(server).toBeDefined();
    // server.close();
  });
});
