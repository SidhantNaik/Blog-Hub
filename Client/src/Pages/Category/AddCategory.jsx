import React, { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import LableText from '../../Components/LableText'
import InputText from '../../Components/InputText'
import Button from '../../Components/Button'
import slugify from 'slugify'
import { getEnv } from '../../Helpers/getEnv'
import { showToast } from '../../Helpers/showToast'


function AddCategory() {


    const formSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        slug: z.string().min(3, "Slug must be at least 3 characters"),

    })

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
        }
    })

    const categoryName = watch('name'); // Add this line outside useEffect

    useEffect(() => {
        if(categoryName) {
            const slug = slugify(categoryName, {lower: true})
            setValue('slug', slug)
        }
    }, [categoryName, setValue]) // Changed dependency array to watchedName

    async function onSubmit(values) {
       try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            })

            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }

            reset()
            showToast('success', data.message)

        }
        catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen p-4">
                <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Add Category</h2>



                    <div className="space-y-4">
                        <div>
                            <LableText labels="Name" />
                            <InputText
                                placeholder="Enter your name"
                                type="text"
                                {...register('name')}
                                error={errors.name?.message}
                            />
                        </div>

                        <div>
                            <LableText labels="Slug" />
                            <InputText
                                placeholder="Enter your slug"
                                type="slug"
                                {...register('slug')}
                                error={errors.email?.message}
                            />
                        </div>

                        

                        <div className="flex justify-center mt-6 mb-4">
                            <Button title="Submit" type="submit" />
                        </div>

                     
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory