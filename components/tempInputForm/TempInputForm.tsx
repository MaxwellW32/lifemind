"use client"
import React, { useState } from 'react'
import styles from "./tempInputForm.module.css"
import { toast } from 'react-hot-toast';
import { ZodObject, ZodType } from 'zod';

type initialFormType = {
    [key: string]: string | null | number;
}

type formInputInfo = {
    [key: keyof initialFormType]: {
        label?: string,
        type: string,
        styles: React.CSSProperties,
        canBeNullable?: boolean,
    }
}

interface TempInputFormProps<T extends initialFormType> {
    initialForm: T;
    formInputInfo: formInputInfo;
    formSchema: ZodObject<any>; // Adjust this type if necessary
    serverFunction: (input: T) => Promise<void>;
}

export default function TempInputForm<T extends initialFormType>({ initialForm, formInputInfo, formSchema, serverFunction }: TempInputFormProps<T>) {
    const [formObj, formObjSet] = useState({ ...initialForm })
    const [formErrors, formErrorsSet] = useState<{ [key: string]: string | null }>({})

    const checkIfValid = (seenFormObj: T, seenName: keyof T) => {
        //@ts-ignore
        const testSchema = formSchema.pick({ [seenName]: true }).safeParse(seenFormObj);

        if (testSchema.success) {//worked
            formErrorsSet(prevObj => {
                const newObj = { ...prevObj }
                //@ts-ignore
                newObj[seenName] = null

                return newObj
            })

        } else {
            formErrorsSet(prevObj => {
                const newObj = { ...prevObj }

                let errorMessage = ""

                //@ts-ignore
                JSON.parse(testSchema.error.message).forEach(eachErrorObj => {
                    errorMessage += eachErrorObj.message
                })

                //@ts-ignore
                newObj[seenName] = errorMessage

                return newObj
            })
        }
    }

    const handleSubmit = async () => {
        try {
            const formCheck = formSchema.safeParse(formObj)
            if (!formCheck.success) {
                toast.error("Form not valid")
                console.log(`$failed form`, formCheck.error);
                return
            }

            await serverFunction(formObj)

            toast.success("Sent!")

            formObjSet({ ...initialForm })

        } catch (error) {
            toast.error("Couldn't send")
            console.log(`$something else happened`, error);
        }
    }

    return (
        <form className={styles.form} action={handleSubmit} >
            {Object.entries(formObj).map((formEntries, formEntriesIndex) => {
                //formEntriesIndex - keyvalue pairs - 0 = keyname 1 = obj value
                const objKey = formEntries[0]
                const objValue = formEntries[1]

                return (
                    <div key={formEntriesIndex} className={styles.inputCont}>
                        {formInputInfo[objKey] && formInputInfo[objKey].label && (<label htmlFor={`${objKey + formEntriesIndex}`}>{formInputInfo[objKey].label}</label>)}

                        <input
                            id={`${objKey + formEntriesIndex}`}
                            type={formInputInfo[objKey] ? formInputInfo[objKey].type : "text"}
                            style={{ ...(formInputInfo[objKey] ? formInputInfo[objKey].styles : {}) }}
                            placeholder={`enter ${objKey}`}
                            value={`${objValue}`}
                            onChange={(e) => {
                                formObjSet(prevObj => {
                                    const newObj = { ...prevObj }
                                    //@ts-ignore
                                    newObj[objKey] = e.target.value

                                    if (formInputInfo[objKey] && formInputInfo[objKey].type === "number") {
                                        //@ts-ignore
                                        newObj[objKey] = parseFloat(e.target.value)
                                    }

                                    if (formInputInfo[objKey] && formInputInfo[objKey].canBeNullable && e.target.value === "") {
                                        //@ts-ignore
                                        newObj[objKey] = null
                                    }

                                    return newObj
                                })
                            }}
                            onBlur={() => {
                                checkIfValid(formObj, objKey)
                            }} />

                        {formErrors[objKey] && (<p style={{ fontSize: "var(--smallFontSize)", position: "absolute", bottom: "-.5rem", translate: "0 100%", maxHeight: "1rem", overflowY: "auto", width: "100%", color: "#f00", opacity: 1 }}>{formErrors[objKey]}</p>)}
                    </div>
                )
            })}

            <button>Submit</button>
        </form>
    )
}
