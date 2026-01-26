import { handleMessage } from "../../src/server/handleMessage";

describe("handle message", () => {
  it("should handle a message correctly", () => {
    const ws = { send: jest.fn() };
    const msg = JSON.stringify({ type: "test", data: "{message}" });
    handleMessage(ws as any, msg);
    expect(ws.send).toHaveBeenCalledWith(expect.stringContaining("processed"));
  });
});
