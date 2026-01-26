import { sendMessage } from "../src/utils/sendMessage";

describe("sendMessage", () => {
  it("should send a message", async () => {
    const mockWs = { send: jest.fn() };
    await sendMessage(mockWs as any, "test message");
    expect(mockWs.send).toHaveBeenCalledWith("test message", { binary: true });
  });
});
