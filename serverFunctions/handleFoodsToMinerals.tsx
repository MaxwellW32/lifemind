"use server"
import { db } from "@/db";
import { foods, foodsToMinerals, foodsToVitamins } from "@/db/schema";
import { food, mineral, newFood, newFoodSchema, vitamin } from "@/types";
import { eq } from "drizzle-orm";

export async function addFoodsToMinerals(id: number, mineral: mineral) {
    const result = await db.insert(foodsToMinerals).values({
        foodId: id,
        mineralId: mineral.id
    })
}