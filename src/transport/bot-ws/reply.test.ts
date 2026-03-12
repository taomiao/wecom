import { describe, expect, it, vi, afterEach } from "vitest";

import { createBotWsReplyHandle } from "./reply.js";

type ReplyHandleParams = Parameters<typeof createBotWsReplyHandle>[0];

describe("createBotWsReplyHandle", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("uses configured placeholder content for immediate ws ack", async () => {
    const replyStream = vi.fn().mockResolvedValue(undefined);
    createBotWsReplyHandle({
      client: {
        replyStream,
      } as unknown as ReplyHandleParams["client"],
      frame: {
        headers: { req_id: "req-1" },
        body: {},
      } as unknown as ReplyHandleParams["frame"],
      accountId: "default",
      placeholderContent: "正在思考...",
    });

    expect(replyStream).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: { req_id: "req-1" },
      }),
      expect.any(String),
      "正在思考...",
      false,
    );
  });

  it("keeps placeholder alive until the first real ws chunk arrives", async () => {
    vi.useFakeTimers();

    const replyStream = vi.fn().mockResolvedValue(undefined);
    const handle = createBotWsReplyHandle({
      client: {
        replyStream,
      } as unknown as ReplyHandleParams["client"],
      frame: {
        headers: { req_id: "req-keepalive" },
        body: {},
      } as unknown as ReplyHandleParams["frame"],
      accountId: "default",
      placeholderContent: "正在思考...",
    });

    await vi.advanceTimersByTimeAsync(3000);
    expect(replyStream).toHaveBeenCalledTimes(2);

    await handle.deliver({ text: "最终回复" }, { kind: "final" });
    await vi.advanceTimersByTimeAsync(6000);

    expect(replyStream).toHaveBeenCalledTimes(3);
    expect(replyStream).toHaveBeenLastCalledWith(
      expect.objectContaining({
        headers: { req_id: "req-keepalive" },
      }),
      expect.any(String),
      "最终回复",
      true,
    );
  });

  it("does not auto-send placeholder when disabled", () => {
    const replyStream = vi.fn().mockResolvedValue(undefined);
    createBotWsReplyHandle({
      client: {
        replyStream,
      } as unknown as ReplyHandleParams["client"],
      frame: {
        headers: { req_id: "req-2" },
        body: {},
      } as unknown as ReplyHandleParams["frame"],
      accountId: "default",
      autoSendPlaceholder: false,
    });

    expect(replyStream).not.toHaveBeenCalled();
  });

  it("swallows expired stream update errors during delivery", async () => {
    const expiredError = {
      headers: { req_id: "req-expired" },
      errcode: 846608,
      errmsg: "stream message update expired (>6 minutes), cannot update",
    };
    const replyStream = vi.fn().mockRejectedValue(expiredError);
    const onFail = vi.fn();
    const handle = createBotWsReplyHandle({
      client: {
        replyStream,
      } as unknown as ReplyHandleParams["client"],
      frame: {
        headers: { req_id: "req-expired" },
        body: {},
      } as unknown as ReplyHandleParams["frame"],
      accountId: "default",
      autoSendPlaceholder: false,
      onFail,
    });

    await expect(handle.deliver({ text: "最终回复" }, { kind: "final" })).resolves.toBeUndefined();

    expect(replyStream).toHaveBeenCalledTimes(1);
    expect(onFail).toHaveBeenCalledWith(expiredError);
  });

  it.each([
    [{ headers: { req_id: "req-invalid" }, errcode: 846605, errmsg: "invalid req_id" }],
    [{ headers: { req_id: "req-expired" }, errcode: 846608, errmsg: "stream message update expired (>6 minutes), cannot update" }],
  ])("does not retry error reply when the ws reply window is already closed", async (error) => {
    const replyStream = vi.fn().mockResolvedValue(undefined);
    const onFail = vi.fn();
    const handle = createBotWsReplyHandle({
      client: {
        replyStream,
      } as unknown as ReplyHandleParams["client"],
      frame: {
        headers: { req_id: String(error.headers.req_id) },
        body: {},
      } as unknown as ReplyHandleParams["frame"],
      accountId: "default",
      autoSendPlaceholder: false,
      onFail,
    });

    await handle.fail?.(error);

    expect(replyStream).not.toHaveBeenCalled();
    expect(onFail).toHaveBeenCalledTimes(1);
  });
});
