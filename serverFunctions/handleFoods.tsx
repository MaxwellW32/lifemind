"use server"
import { db } from "@/db";
import { foods } from "@/db/schema";
import { food, newFood, newFoodSchema } from "@/types";
import { eq } from "drizzle-orm";

export async function getAllFoods(seenLimit: number, seenOffset: number): Promise<food[]> {
    const results = await db.query.foods.findMany({
        limit: seenLimit,
        offset: seenOffset,
        with: {
            foodsToVitamins: {
                with: {
                    vitamin: true
                }
            },
            foodsToMinerals: {
                with: {
                    mineral: true
                }
            },
            foodsToRelatedNames: {
                with: {
                    relatedName: true
                }
            },
            foodsToCompanies: {
                with: {
                    company: true
                }
            },
            foodsToClassifications: {
                with: {
                    classification: true
                }
            }
        }
    });

    return results
}

export async function addFood(foodObj: newFood) {
    const validateFoodObj = newFoodSchema.safeParse(foodObj)

    //save calories and weightperml in 100 grams
    //conversion to smaller units will be done later


    if (!validateFoodObj.success) {
        console.log(`$validation error adding food`, validateFoodObj.error.message);
    }

    await db.insert(foods).values(foodObj);
}


export async function getSpecificFood(foodObjId: Pick<food, "id">): Promise<food | undefined> {
    const result = await db.query.foods.findFirst({
        where: eq(foods.id, foodObjId.id),
        with: {
            foodsToVitamins: {
                with: {
                    vitamin: true
                }
            },
            foodsToMinerals: {
                with: {
                    mineral: true
                }
            },
            foodsToRelatedNames: {
                with: {
                    relatedName: true
                }
            },
            foodsToCompanies: {
                with: {
                    company: true
                }
            },
            foodsToClassifications: {
                with: {
                    classification: true
                }
            }
        }
    })

    return result
}

