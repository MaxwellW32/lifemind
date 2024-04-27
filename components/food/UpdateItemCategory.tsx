"use client"
import { addFoodsToVitamins } from '@/serverFunctions/handleFoodsToVitamins'
import { getVitaminsBySearch } from '@/serverFunctions/handleVitamins'
import { food, vitamin } from '@/types'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import styles from "./updateItemCategory.module.css"

//make everything come from outside the function
//make it call methods to set state upwards
//then rename to generic things
//item is food table - category are many many relations


interface UpdateItemCategoryProps<T> {
    tableId: number;
    serverFunction: (id: number, passedObj: T) => Promise<void>;
    getCategoriesFunction: (name: string) => Promise<T[]>;
    categoryName: string;
}


export default function UpdateItemCategory<T>({ tableId, serverFunction, getCategoriesFunction, categoryName }: UpdateItemCategoryProps<T>) {
    const [chosenCategoryIds, chosenCategoryIdsSet] = useState<{ [key: number]: T | undefined }>({})
    const [currentSearch, currentSearchSet] = useState("")
    const [searchResults, searchResultsSet] = useState<T[]>([])

    const searchDebounce = useRef<NodeJS.Timeout>()

    async function addCategoriesToMainTable() {
        await Promise.all(Object.values(chosenCategoryIds).map(async eachCategory => {
            if (eachCategory === undefined) return

            return serverFunction(tableId, eachCategory)
        }))

        toast.success("added")
    }

    return (
        <div style={{ display: "grid", gap: ".5rem" }}>
            <div>
                <p>Search for {categoryName}</p>

                <input style={{ color: "#000" }} type='text' placeholder='search' value={currentSearch} onChange={(e) => {
                    if (searchDebounce.current) clearTimeout(searchDebounce.current)
                    currentSearchSet(e.target.value)

                    searchDebounce.current = setTimeout(async () => {//run search
                        const seenResults = await getCategoriesFunction(currentSearch)
                        searchResultsSet(seenResults)
                    }, 1000);
                }} />
            </div>

            {searchResults.length > 0 && (
                <div className={styles.overFlowParent}>
                    <p>Search Results</p>

                    <div className={styles.overFlowChild}>
                        {searchResults.map(eachCategory => {
                            return (
                                // @ts-ignore
                                <button className='mainButton' style={{ padding: ".5rem", fontSize: "var(--smallFontSize)" }} key={eachCategory.id} onClick={() => {
                                    chosenCategoryIdsSet(prevObj => {
                                        const newObj = { ...prevObj }
                                        // @ts-ignore
                                        newObj[eachCategory.id] = eachCategory
                                        return newObj
                                    })
                                }}>

                                    {/* @ts-ignore */}
                                    Add {eachCategory.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {Object.entries(chosenCategoryIds).length > 0 && (
                <div className={styles.overFlowParent}>
                    <p>{categoryName} Added</p>

                    <div className={styles.overFlowChild}>
                        {Object.entries(chosenCategoryIds).map(([key, value], eachEntryIndex) => {
                            if (value === undefined || value === null) return null;

                            return (
                                <div key={eachEntryIndex} style={{ padding: ".5rem", display: "flex", gap: ".2rem" }}>
                                    {/* @ts-ignore */}
                                    <p>{value.name}</p>

                                    <div onClick={() => {
                                        chosenCategoryIdsSet(prevObj => {
                                            const newObj = { ...prevObj };
                                            //@ts-ignore
                                            newObj[key] = undefined;
                                            return newObj;
                                        });
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {Object.values(chosenCategoryIds).length > 0 && (
                <button onClick={addCategoriesToMainTable} className='mainButton'>Submit Changes</button>
            )}
        </div>
    )
}
