"use server"
import { db } from "@/db";
import { foods, vitamins } from "@/db/schema";
import { food, newFood, newFoodSchema, newVitamin, newVitaminSchema, vitamin } from "@/types";
import { eq, ilike } from "drizzle-orm";

export async function addVitamin(vitaminObj: newVitamin) {
    const validateVitaminObj = newVitaminSchema.safeParse(vitaminObj)

    if (!validateVitaminObj.success) {
        console.log(`$validation error adding vitamin`, validateVitaminObj.error.message);
    }

    await db.insert(vitamins).values(vitaminObj);
}


export async function getVitaminsBySearch(vitaminName: string): Promise<vitamin[]> {
    const seenResources = await db.query.vitamins.findMany({
        where: ilike(vitamins.name, `%${vitaminName.toLowerCase()}%`),
    });

    return seenResources
}
