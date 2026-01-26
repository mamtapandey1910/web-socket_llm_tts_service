import { handleWSConnection } from "../../src/server/connection";

describe("handleConnection", () => {
  it("should handle a new WebSocket connection", () => {
    const ws = { send: jest.fn(), on: jest.fn() };
    const req = { url: "/test" };
    handleWSConnection(ws as any, req as any);
    expect(ws.on).toHaveBeenCalledWith("message", expect.any(Function));
  });
});
