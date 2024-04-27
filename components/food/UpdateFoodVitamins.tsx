"use client"
import { addFoodsToVitamins } from '@/serverFunctions/handleFoodsToVitamins'
import { getVitaminsBySearch } from '@/serverFunctions/handleVitamins'
import { food, vitamin } from '@/types'
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function UpdateFoodVitamins({ foodId }: { foodId: Pick<food, "id"> }) {
    const [chosenVitaminIds, chosenVitaminIdsSet] = useState<{ [key: number]: vitamin | undefined }>({})
    const [currentSearch, currentSearchSet] = useState("")
    const [searchResults, searchResultsSet] = useState<vitamin[]>([])

    const searchDebounce = useRef<NodeJS.Timeout>()

    async function addCategoriesToFood() {
        await Promise.all(Object.values(chosenVitaminIds).map(async eachVitamin => {
            if (eachVitamin === undefined) return

            return addFoodsToVitamins(foodId.id, eachVitamin)
        }))

        toast.success("added")
    }

    return (
        <div style={{ display: "grid", gap: ".5rem" }}>
            <div>
                <p>Search for Vitamins</p>

                <input style={{ color: "#000" }} type='text' placeholder='search' value={currentSearch} onChange={(e) => {
                    if (searchDebounce.current) clearTimeout(searchDebounce.current)
                    currentSearchSet(e.target.value)

                    searchDebounce.current = setTimeout(async () => {//run search
                        const seenResults = await getVitaminsBySearch(currentSearch)
                        searchResultsSet(seenResults)
                    }, 1000);
                }} />
            </div>

            <div>
                <p>Search Results</p>

                {searchResults.map(eachVitamin => {
                    return (
                        <button key={eachVitamin.id} onClick={() => {
                            chosenVitaminIdsSet(prevObj => {
                                const newObj = { ...prevObj }
                                newObj[eachVitamin.id] = eachVitamin
                                return newObj
                            })
                        }}>
                            Add {eachVitamin.name}
                        </button>
                    )
                })}
            </div>

            <div>
                <p>Vitamins Added</p>

                {Object.entries(chosenVitaminIds).map((eachEntry, eachEntryIndex) => {
                    const ObjKey = eachEntry[0]
                    const ObjValue = eachEntry[1]
                    if (ObjValue === undefined) return null

                    return (
                        <div key={eachEntryIndex}>
                            <p>{ObjValue.name}</p>

                            <button onClick={() => {
                                chosenVitaminIdsSet(prevObj => {
                                    const newObj = { ...prevObj }
                                    newObj[ObjValue.id] = undefined
                                    return newObj
                                })
                            }}>Remove</button>
                        </div>
                    )
                })}
            </div>

            <button onClick={addCategoriesToFood} className='mainButton'>Submit Changes</button>
        </div>
    )
}
