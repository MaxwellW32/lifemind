"use server"

import { db } from "@/db";
import { foods } from "@/db/schema";
import { food, newFood, newFoodSchema } from "@/types";

export async function getAllFoods(seenLimit: number, seenOffset: number): Promise<food[]> {
    const results = await db.query.foods.findMany({
        limit: seenLimit,
        offset: seenOffset,
        with: {
            foodsToVitamins: {
                with: {
                    vitamin: true
                }
            }
        }
    });

    return results
}

export async function addFood(foodObj: newFood) {
    const validateFoodObj = newFoodSchema.safeParse(foodObj)

    if (!validateFoodObj.success) {
        console.log(`$validation error adding food`, validateFoodObj.error.message);
    }

    await db.insert(foods).values(foodObj);
}
