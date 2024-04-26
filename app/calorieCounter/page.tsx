"use client"
import TempInputForm from '@/components/tempInputForm/TempInputForm';
import { addFood, getAllFoods } from '@/serverFunctions/handleFoods';
import { testServerFunction } from '@/serverFunctions/testServerFunction';
import { food, newFood, newFoodSchema } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function calculateCalories(food: food, amount: number, askingForLiquidConversion?: boolean) {
    if (food.weightPerMl && askingForLiquidConversion) {
        const amountOfGrams = food.weightPerMl * amount
        const caloriesInThatManyGrams = amountOfGrams * food.calories

        return caloriesInThatManyGrams
    } else {
        return (amount / 1) * food.calories;
    }
}

export default function Page() {
    const [seenFoods, seenFoodsSet] = useState<food[]>([])

    useEffect(() => {
        async function check() {
            const seenFoodsLocal = await getAllFoods(50, 0)
            seenFoodsSet(seenFoodsLocal)
        }

        check()
    }, [])

    return (
        <main>
            <section>
                <p>View All foods</p>

                <div style={{ display: "grid", }}>
                    {seenFoods.map(eachFood => {
                        return (
                            <div key={eachFood.id}>
                                <div>
                                    <p>{eachFood.name}</p>
                                    <p>{eachFood.calories}</p>
                                    <Image alt={`${eachFood.name} image`} src={eachFood.image} width={100} height={100} style={{ objectFit: "cover", }} />
                                    {eachFood.weightPerMl && <p>{eachFood.weightPerMl}</p>}
                                </div>

                                {eachFood.foodsToVitamins && eachFood.foodsToVitamins.map((eachFoodToVitamin) => {
                                    if (!eachFoodToVitamin.vitamin) return null

                                    return (
                                        <div key={eachFoodToVitamin.vitaminId}>
                                            <p>Vitamin name {eachFoodToVitamin.vitamin.name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </section>

            <section style={{ display: "grid" }}>
                <p>Upload new Food</p>

                <TempInputForm
                    initialForm={{
                        name: "",
                        calories: 0,
                        image: "",
                        weightPerMl: null,
                    } as newFood}

                    formInputInfo={{
                        "name": {
                            type: "text",
                            styles: {},
                            label: "Enter Name"
                        },
                        "calories": {
                            type: "number",
                            styles: {},
                            label: "Please Enter Calories"
                        },
                        "image": {
                            type: "text",
                            styles: {},
                            label: "Please Enter Image"
                        },
                        "weightPerMl": {
                            type: "number",
                            styles: {},
                            label: "Please Enter weightPerMl",
                            canBeNullable: true
                        },
                    }}

                    formSchema={newFoodSchema}

                    serverFunction={addFood}
                />
            </section>
        </main>
    )
}
