"use client"
import TempInputForm from '@/components/tempInputForm/TempInputForm';
import { foods } from '@/db/schema';
import { addFood, getAllFoods } from '@/serverFunctions/handleFoods';
import { testServerFunction } from '@/serverFunctions/testServerFunction';
import { food, newFood, newFoodSchema } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

//read whole numbers from database
//calories per 100g
//ml weight per 100g
//convert it to decimal amount of 1 gram each
//then do any conversion you want

//one page to view all foods
//search bar
//sepearate page to add fruits 
// can add vitamins minerals suggestions
//make function to accept an array of ids to add to the linked many many tables
//see if you can make the search element resuable.

export default function Page() {

    return (
        <main>
        </main>
    )
}
