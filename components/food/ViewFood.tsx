import { food } from '@/types'
import React from 'react'
import styles from "./viewFood.module.css"
import Image from 'next/image'
import UpdateFoodVitamins from './UpdateFoodVitamins'
import ShowMore from '../showMore/ShowMore'
import UpdateItemCategory from './UpdateItemCategory'
import { getVitaminsBySearch } from '@/serverFunctions/handleVitamins'
import { addFoodsToVitamins } from '@/serverFunctions/handleFoodsToVitamins'
import { getMineralsBySearch } from '@/serverFunctions/handleMinerals'
import { addFoodsToMinerals } from '@/serverFunctions/handleFoodsToMinerals'

export default function ViewFood({ foodObj, showFullScreen = false }: { foodObj: food, showFullScreen?: boolean }) {
    return (
        <div className={styles.foodCont} style={{ margin: showFullScreen ? "0 auto" : "" }}>
            <Image alt={`image form ${foodObj.name}`} src={foodObj.image} width={300} height={300} style={{ objectFit: "cover", width: "min(300px, 80%)", aspectRatio: "1/1" }} />
            <p>name: {foodObj.name}</p>

            {showFullScreen && (
                <>
                    <p>calories: {foodObj.calories}</p>

                    {foodObj.weightPerMl && <p>weightPerMl: {foodObj.weightPerMl}</p>}

                    {foodObj.foodsToRelatedNames && foodObj.foodsToRelatedNames.length > 0 && (
                        <div className={styles.infoOverFlowCont}>
                            {foodObj.foodsToRelatedNames.map((eachFoodToVitamin) => {
                                if (!eachFoodToVitamin.relatedName) return null

                                return (
                                    <div key={eachFoodToVitamin.relatedNameId}>
                                        <p>Related name {eachFoodToVitamin.relatedName.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {foodObj.foodsToVitamins && foodObj.foodsToVitamins.length > 0 && (
                        <div className={styles.infoOverFlowCont}>
                            {foodObj.foodsToVitamins.map((eachFoodToVitamin) => {
                                if (!eachFoodToVitamin.vitamin) return null

                                return (
                                    <div key={eachFoodToVitamin.vitaminId}>
                                        <p>Vitamin name: {eachFoodToVitamin.vitamin.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {foodObj.foodsToMinerals && foodObj.foodsToMinerals.length > 0 && (
                        <div className={styles.infoOverFlowCont}>
                            {foodObj.foodsToMinerals.map((eachFoodToVitamin) => {
                                if (!eachFoodToVitamin.mineral) return null

                                return (
                                    <div key={eachFoodToVitamin.mineralId}>
                                        <p>Mineral: {eachFoodToVitamin.mineral.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {foodObj.foodsToCompanies && foodObj.foodsToCompanies.length > 0 && (
                        <div className={styles.infoOverFlowCont}>
                            {foodObj.foodsToCompanies.map((eachFoodToVitamin) => {
                                if (!eachFoodToVitamin.company) return null

                                return (
                                    <div key={eachFoodToVitamin.companyId}>
                                        <p>Company name {eachFoodToVitamin.company.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {foodObj.foodsToClassifications && foodObj.foodsToClassifications.length > 0 && (
                        <div className={styles.infoOverFlowCont}>
                            {foodObj.foodsToClassifications.map((eachFoodToVitamin) => {
                                if (!eachFoodToVitamin.classification) return null

                                return (
                                    <div key={eachFoodToVitamin.classificationId}>
                                        <p>classification name {eachFoodToVitamin.classification.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </>
            )}

            {showFullScreen && (
                <ShowMore label='Make Suggestions' content={(
                    <>
                        <ShowMore label='Add Vitamins' content={<UpdateItemCategory tableId={foodObj.id} categoryName='Vitamins' getCategoriesFunction={getVitaminsBySearch} serverFunction={addFoodsToVitamins} />} />

                        <ShowMore label='Add Minerals' content={<UpdateItemCategory tableId={foodObj.id} categoryName='Minerals' getCategoriesFunction={getMineralsBySearch} serverFunction={addFoodsToMinerals} />} />
                    </>
                )} />
            )}

        </div>
    )
}
