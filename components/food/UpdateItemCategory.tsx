"use client"
import { addFoodsToVitamins } from '@/serverFunctions/handleFoodsToVitamins'
import { getVitaminsBySearch } from '@/serverFunctions/handleVitamins'
import { food, vitamin } from '@/types'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

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

            <div>
                <p>Search Results</p>

                {searchResults.map(eachCategory => {
                    return (
                        // @ts-ignore
                        <button key={eachCategory.id} onClick={() => {
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

            <div>
                <p>{categoryName} Added</p>

                {Object.entries(chosenCategoryIds).map(([key, value], eachEntryIndex) => {
                    if (value === undefined || value === null) return null;

                    return (
                        <div key={eachEntryIndex}>
                            {/* @ts-ignore */}
                            <p>{value.name}</p>

                            <button onClick={() => {
                                chosenCategoryIdsSet(prevObj => {
                                    const newObj = { ...prevObj };
                                    //@ts-ignore
                                    newObj[key] = undefined;
                                    return newObj;
                                });
                            }}>Remove</button>
                        </div>
                    );
                })}
            </div>

            <button onClick={addCategoriesToMainTable} className='mainButton'>Submit Changes</button>
        </div>
    )
}
