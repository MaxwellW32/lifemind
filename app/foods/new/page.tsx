"use client"
import React from 'react'
import styles from "./page.module.css"
import TempInputForm from '@/components/tempInputForm/TempInputForm'
import { newFood, newFoodSchema } from '@/types'
import { addFood } from '@/serverFunctions/handleFoods'

export default function Page() {

    const newObj: newFood = {
        name: "",
        calories: 0,
        image: "",
        weightPerMl: null,
    }


    return (
        <main>
            <section>
                <p>Add a new Food Item</p>

                <TempInputForm
                    initialForm={newObj}

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
