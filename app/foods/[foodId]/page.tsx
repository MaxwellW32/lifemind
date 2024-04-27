import React from 'react'
import styles from "./page.module.css"
import { getSpecificFood } from '@/serverFunctions/handleFoods'
import ViewFood from '@/components/food/ViewFood'

export default async function page({ params }: { params: { foodId: string } }) {
    const wantedId = params.foodId ? parseInt(params.foodId) : undefined
    if (!wantedId) return (<p>No id seen</p>)

    const seenFood = await getSpecificFood({ id: wantedId })
    if (!seenFood) return (<p>Food of that id {wantedId} not found</p>)

    return (
        <main style={{ display: "grid", backgroundColor: "orange" }}>
            <ViewFood foodObj={seenFood} showFullScreen={true} />
        </main>
    )
}
