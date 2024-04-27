"use server"
import { db } from "@/db";
import { foods, foodsToVitamins } from "@/db/schema";
import { food, newFood, newFoodSchema, vitamin } from "@/types";
import { eq } from "drizzle-orm";

export async function addFoodsToVitamins(id: number, vitamin: vitamin) {

    const result = await db.insert(foodsToVitamins).values({
        foodId: id,
        vitaminId: vitamin.id
    })
}