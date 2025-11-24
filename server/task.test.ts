import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as any,
  };

  return ctx;
}

describe("task router", () => {
  describe("task.create", () => {
    it("should create a task with title", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.task.create({
        title: "Test Task",
        description: "Test Description",
      });

      expect(result).toBeDefined();
    });

    it("should reject task creation without title", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.task.create({
          title: "",
          description: "Test Description",
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("Title is required");
      }
    });
  });

  describe("task.list", () => {
    it("should list tasks for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.task.list();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("task.update", () => {
    it("should update a task", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // First create a task
      const createResult = await caller.task.create({
        title: "Task to Update",
      });

      // Then update it
      const updateResult = await caller.task.update({
        id: 1,
        title: "Updated Task",
      });

      expect(updateResult).toBeDefined();
    });
  });

  describe("task.delete", () => {
    it("should delete a task", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.task.delete({ id: 1 });

      expect(result).toBeDefined();
    });
  });

  describe("task.updateStreak", () => {
    it("should update task streak", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.task.updateStreak({
        taskId: 1,
        currentStreak: 5,
        longestStreak: 10,
      });

      expect(result).toBeDefined();
    });
  });
});
