"use client"
import React from 'react'
import styles from "./page.module.css"
import TempInputForm from '@/components/tempInputForm/TempInputForm'
import { newFood, newFoodSchema, newVitamin, newVitaminSchema } from '@/types'
import { addFood } from '@/serverFunctions/handleFoods'
import { addVitamin } from '@/serverFunctions/handleVitamins'

export default function Page() {
    const newObj: newVitamin = {
        name: "",
    }

    return (
        <main>
            <section>
                <p>Add a new Vitamin</p>

                <TempInputForm
                    initialForm={newObj}

                    formInputInfo={{
                        "name": {
                            type: "text",
                            styles: {},
                            label: "Enter Vitamin Name"
                        }
                    }}

                    formSchema={newVitaminSchema}

                    serverFunction={addVitamin}
                />
            </section>
        </main>
    )
}
