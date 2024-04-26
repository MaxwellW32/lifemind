import { relations } from "drizzle-orm";
import { boolean, index, pgTable, primaryKey, integer, serial, text, timestamp, varchar, } from "drizzle-orm/pg-core";


export const tests = pgTable("test", {
    id: text("id").notNull().primaryKey(),
},
    (table) => {
        return {
        };
    })


// export const usersRelations = relations(users, ({ many }) => ({
//     resourcesPosted: many(resources),
//     usersToBookmarks: many(usersToBookmarks),
// }));

