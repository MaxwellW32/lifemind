"use client"
import React from 'react'
import styles from "./page.module.css"
import TempInputForm from '@/components/tempInputForm/TempInputForm'
import { newMineral, newMineralSchema } from '@/types'
import { addMineral } from '@/serverFunctions/handleMinerals'

export default function Page() {
    const newObj: newMineral = {
        name: "",
    }

    return (
        <main>
            <section>
                <p>Add a new Mineral</p>

                <TempInputForm
                    initialForm={newObj}

                    formInputInfo={{
                        "name": {
                            type: "text",
                            styles: {},
                            label: "Enter Mineral Name"
                        }
                    }}

                    formSchema={newMineralSchema}

                    serverFunction={addMineral}
                />
            </section>
        </main>
    )
}
