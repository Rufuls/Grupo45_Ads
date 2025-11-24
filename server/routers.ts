import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStreak,
  updateTaskStreak,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  task: router({
    list: protectedProcedure.query(({ ctx }) => getUserTasks(ctx.user.id)),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1, "Title is required"),
          description: z.string().optional(),
          dueDate: z.date().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const result = await createTask(
          ctx.user.id,
          input.title,
          input.description,
          input.dueDate
        );
        return result;
      }),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          completed: z.number().optional(),
          completedAt: z.date().optional(),
          dueDate: z.date().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        return await updateTask(id, updates);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return await deleteTask(input.id);
      }),
    getStreak: protectedProcedure
      .input(z.object({ taskId: z.number() }))
      .query(async ({ input }) => {
        return await getTaskStreak(input.taskId);
      }),
    updateStreak: protectedProcedure
      .input(
        z.object({
          taskId: z.number(),
          currentStreak: z.number(),
          longestStreak: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return await updateTaskStreak(
          input.taskId,
          ctx.user.id,
          input.currentStreak,
          input.longestStreak
        );
      }),
  }),
});

export type AppRouter = typeof appRouter;
