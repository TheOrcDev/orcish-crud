"use server";

import { db } from "@/db/drizzle";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
    try {
        const allUsers = await db.select().from(users);
        return allUsers;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export async function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
    try {
        await db.insert(users).values(user);
    } catch (error) {
        console.error(error);
        return { error: "Failed to create user" };
    }
}

export async function updateUser(user: Omit<User, "createdAt" | "updatedAt">) {
    try {
        await db.update(users).set(user).where(eq(users.id, user.id));
    } catch (error) {
        console.error(error);
        return { error: "Failed to update user" };
    }
}

export async function deleteUser(id: string) {
    try {
        await db.delete(users).where(eq(users.id, id));
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete user" };
    }
}