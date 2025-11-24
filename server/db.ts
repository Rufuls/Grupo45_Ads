import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, tasks, taskStreaks } from "../drizzle/schema";
import type { InsertTask } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get all tasks for a user
 */
export async function getUserTasks(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get tasks: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(tasks.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get user tasks:", error);
    throw error;
  }
}

/**
 * Create a new task
 */
export async function createTask(
  userId: number,
  title: string,
  description?: string,
  dueDate?: Date
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create task: database not available");
    return null;
  }

  try {
    const result = await db.insert(tasks).values({
      userId,
      title,
      description,
      dueDate,
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to create task:", error);
    throw error;
  }
}

/**
 * Update a task
 */
export async function updateTask(
  taskId: number,
  updates: Partial<Omit<InsertTask, "userId">>
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update task: database not available");
    return null;
  }

  try {
    const result = await db
      .update(tasks)
      .set(updates)
      .where(eq(tasks.id, taskId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update task:", error);
    throw error;
  }
}

/**
 * Delete a task
 */
export async function deleteTask(taskId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete task: database not available");
    return null;
  }

  try {
    const result = await db.delete(tasks).where(eq(tasks.id, taskId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete task:", error);
    throw error;
  }
}

/**
 * Get task streak for a specific task
 */
export async function getTaskStreak(taskId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get task streak: database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(taskStreaks)
      .where(eq(taskStreaks.taskId, taskId))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get task streak:", error);
    throw error;
  }
}

/**
 * Update task streak
 */
export async function updateTaskStreak(
  taskId: number,
  userId: number,
  currentStreak: number,
  longestStreak: number
) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update task streak: database not available");
    return null;
  }

  try {
    const existing = await getTaskStreak(taskId);
    if (existing) {
      return await db
        .update(taskStreaks)
        .set({
          currentStreak,
          longestStreak,
          lastCompletedDate: new Date(),
        })
        .where(eq(taskStreaks.taskId, taskId));
    } else {
      return await db.insert(taskStreaks).values({
        taskId,
        userId,
        currentStreak,
        longestStreak,
        lastCompletedDate: new Date(),
      });
    }
  } catch (error) {
    console.error("[Database] Failed to update task streak:", error);
    throw error;
  }
}


