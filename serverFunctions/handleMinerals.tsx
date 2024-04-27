"use server"
import { db } from "@/db";
import { minerals } from "@/db/schema";
import { mineral, newMineral, newMineralSchema } from "@/types";
import { eq, ilike } from "drizzle-orm";

export async function addMineral(mineralObj: newMineral) {
    const validateMineralObj = newMineralSchema.safeParse(mineralObj)

    if (!validateMineralObj.success) {
        console.log(`$validation error adding mineral`, validateMineralObj.error.message);
    }

    await db.insert(minerals).values(mineralObj);
}


export async function getMineralsBySearch(mineralName: string): Promise<mineral[]> {
    const seenResources = await db.query.minerals.findMany({
        where: ilike(minerals.name, `%${mineralName.toLowerCase()}%`),
    });

    return seenResources
}
