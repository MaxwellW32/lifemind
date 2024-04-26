import { z } from "zod";

export const foodSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
    calories: z.number(),
    image: z.string().min(1),
    weightPerMl: z.number().nullable(),
})
export const newFoodSchema = foodSchema.omit({ id: true })

export type newFood = z.infer<typeof newFoodSchema>
export type food = z.infer<typeof foodSchema> & {
    foodsToRelatedNames?: foodsToRelatedNames[],
    foodsToVitamins?: foodsToVitamins[],
    foodsToMinerals?: foodsToMinerals[],
    foodsToCompanies?: foodsToCompanies[],
    foodsToClassifications?: foodsToClassifications[],
}





export const relatedNamesSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
})

export type relatedName = z.infer<typeof relatedNamesSchema> & {
    foodsToRelatedNames?: foodsToRelatedNames[],
}







export const vitaminsSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
})

export type vitamin = z.infer<typeof vitaminsSchema> & {
    foodsToVitamins?: foodsToVitamins[]
}








export const mineralsSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
})

export type mineral = z.infer<typeof mineralsSchema> & {
    foodsToMinerals?: foodsToMinerals[],
}







export const companiesSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
})

export type company = z.infer<typeof companiesSchema> & {
    foodsToCompanies?: foodsToCompanies[],
}








export const classificationsSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
})

export type classification = z.infer<typeof classificationsSchema> & {
    foodsToClassifications?: foodsToClassifications[],
}






























export const foodsToRelatedNamesSchema = z.object({
    foodId: z.number(),
    relatedNameId: z.number(),
})
export type foodsToRelatedNames = z.infer<typeof foodsToRelatedNamesSchema> & {
    food?: food,
    relatedName?: relatedName
}







export const foodsToVitaminsSchema = z.object({
    foodId: z.number(),
    vitaminId: z.number(),
})
export type foodsToVitamins = z.infer<typeof foodsToVitaminsSchema> & {
    food?: food,
    vitamin?: vitamin
}







export const foodsToMineralsSchema = z.object({
    foodId: z.number(),
    mineralId: z.number(),
})
export type foodsToMinerals = z.infer<typeof foodsToMineralsSchema> & {
    food?: food,
    mineral?: mineral
}








export const foodsToCompaniesSchema = z.object({
    foodId: z.number(),
    companyId: z.number(),
})
export type foodsToCompanies = z.infer<typeof foodsToCompaniesSchema> & {
    food?: food,
    company?: company
}






export const foodsToClassificationsSchema = z.object({
    foodId: z.number(),
    classificationId: z.number(),
})
export type foodsToClassifications = z.infer<typeof foodsToClassificationsSchema> & {
    food?: food,
    classification?: classification
}
