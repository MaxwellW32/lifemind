import { relations } from "drizzle-orm";
import { index, pgTable, primaryKey, integer, serial, text, varchar, } from "drizzle-orm/pg-core";

//rules when adding schemas
//nameoftable
//nameoftable relations
//many to many - make a third table - link back each one to one
//one to many - can use normal many relation - then link back with a foreign key 
//typeof foods.$inferSelect; //infer type to make schemas

export const foods = pgTable("foods", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    calories: integer("calories").notNull(),
    image: varchar("image", { length: 255 }).notNull(),
    weightPerMl: integer("weightPerMl"),
},
    (table) => {
        return {
            foodNamesIndex: index("foodNamesIndex").on(table.name),
        };
    })
export const foodsRelations = relations(foods, ({ many }) => ({
    foodsToRelatedNames: many(foodsToRelatedNames),
    foodsToVitamins: many(foodsToVitamins),
    foodsToMinerals: many(foodsToMinerals),
    foodsToCompanies: many(foodsToCompanies),
    foodsToClassifications: many(foodsToClassifications),
}));







export const relatedNames = pgTable("relatedNames", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull()
},
    (table) => {
        return {
            relatedNamesIndex: index("relatedNamesIndex").on(table.name),
        };
    })
export const relatedNamesRelations = relations(relatedNames, ({ many }) => ({
    foodsToRelatedNames: many(foodsToRelatedNames),
}));









export const vitamins = pgTable("vitamins", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull()
},
    (table) => {
        return {
            vitaminNamesIndex: index("vitaminNamesIndex").on(table.name),
        };
    })
export const vitaminsRelations = relations(vitamins, ({ many }) => ({
    foodsToVitamins: many(foodsToVitamins),
}));








export const minerals = pgTable("minerals", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull()
},
    (table) => {
        return {
            mineralNamesIndex: index("mineralNamesIndex").on(table.name),
        };
    })
export const mineralsRelations = relations(minerals, ({ many }) => ({
    foodsToMinerals: many(foodsToMinerals),
}));







export const companies = pgTable("companies", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull()
},
    (table) => {
        return {
            companyNamesIndex: index("companyNamesIndex").on(table.name),
        };
    })
export const companiesRelations = relations(companies, ({ many }) => ({
    foodsToCompanies: many(foodsToCompanies),
}));










export const classifications = pgTable("classifications", {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull()
},
    (table) => {
        return {
            classificationNamesIndex: index("classificationNamesIndex").on(table.name),
        };
    })
export const classificationsRelations = relations(classifications, ({ many }) => ({
    foodsToClassifications: many(foodsToClassifications),
}));
























































//many to many junction tables
export const foodsToRelatedNames = pgTable('foodsToRelatedNames', {
    foodId: serial('foodId').notNull().references(() => foods.id),
    relatedNameId: serial('relatedNameId').notNull().references(() => relatedNames.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.foodId, t.relatedNameId] }),
}),
);
export const foodsToRelatedNamesRelations = relations(foodsToRelatedNames, ({ one }) => ({
    food: one(foods, {
        fields: [foodsToRelatedNames.foodId],
        references: [foods.id],
    }),
    relatedName: one(relatedNames, {
        fields: [foodsToRelatedNames.relatedNameId],
        references: [relatedNames.id],
    }),
}));










export const foodsToVitamins = pgTable('foodsToVitamins', {
    foodId: serial('foodId').notNull().references(() => foods.id),
    vitaminId: serial('vitaminId').notNull().references(() => vitamins.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.foodId, t.vitaminId] }),
}),
);
export const foodsToVitaminsRelations = relations(foodsToVitamins, ({ one }) => ({
    food: one(foods, {
        fields: [foodsToVitamins.foodId],
        references: [foods.id],
    }),
    vitamin: one(vitamins, {
        fields: [foodsToVitamins.vitaminId],
        references: [vitamins.id],
    }),
}));






export const foodsToMinerals = pgTable('foodsToMinerals', {
    foodId: serial('foodId').notNull().references(() => foods.id),
    mineralId: serial('mineralId').notNull().references(() => minerals.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.foodId, t.mineralId] }),
}),
);
export const foodsToMineralsRelations = relations(foodsToMinerals, ({ one }) => ({
    food: one(foods, {
        fields: [foodsToMinerals.foodId],
        references: [foods.id],
    }),
    mineral: one(minerals, {
        fields: [foodsToMinerals.mineralId],
        references: [minerals.id],
    }),
}));







export const foodsToCompanies = pgTable('foodsToCompanies', {
    foodId: serial('foodId').notNull().references(() => foods.id),
    companyId: serial('companyId').notNull().references(() => companies.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.foodId, t.companyId] }),
}),
);
export const foodsToCompaniesRelations = relations(foodsToCompanies, ({ one }) => ({
    food: one(foods, {
        fields: [foodsToCompanies.foodId],
        references: [foods.id],
    }),
    company: one(companies, {
        fields: [foodsToCompanies.companyId],
        references: [companies.id],
    }),
}));







export const foodsToClassifications = pgTable('foodsToClassifications', {
    foodId: serial('foodId').notNull().references(() => foods.id),
    classificationId: serial('classificationId').notNull().references(() => classifications.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.foodId, t.classificationId] }),
}),
);
export const foodsToClassificationsRelations = relations(foodsToClassifications, ({ one }) => ({
    food: one(foods, {
        fields: [foodsToClassifications.foodId],
        references: [foods.id],
    }),
    classification: one(classifications, {
        fields: [foodsToClassifications.classificationId],
        references: [classifications.id],
    }),
}));

