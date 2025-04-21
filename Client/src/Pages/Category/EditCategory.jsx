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
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { RouteCategoryDetails } from '../../Helpers/RouteNames'
import Loading from '../../Components/Loading'

function EditCategory() {
    const { category_id } = useParams()

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

    const { data: categoryData, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/category/show/${category_id}`,
        {
            method: 'get',
            credentials: 'include',
        }
    )

    const categoryName = watch('name')

    // Effect to populate form with category data
    useEffect(() => {
        if (categoryData?.category) {
            reset({
                name: categoryData.category.name,
                slug: categoryData.category.slug
            })
        }
    }, [categoryData, reset])

    // Effect to handle slug generation
    useEffect(() => {
        if (categoryName) {
            const slug = slugify(categoryName, { lower: true })
            setValue('slug', slug)
        }
    }, [categoryName, setValue])

    async function onSubmit(values) {
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/update/${category_id}`, {
                method: 'put',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(values)
            })

            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }

            showToast('success', data.message)
        }
        catch (error) {
            showToast('error', error.message)
        }
    }

    if (loading) return <Loading />
    if (error) return <div className="text-center text-red-500 py-4">Error loading category</div>

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Edit Category</h2>

                <div className="space-y-4">
                    <div>
                        <LableText labels="Name" />
                        <InputText
                            placeholder="Enter category name"
                            type="text"
                            {...register('name')}
                            error={errors.name?.message}
                        />
                    </div>

                    <div>
                        <LableText labels="Slug" />
                        <InputText
                            placeholder="Enter category slug"
                            type="text"
                            {...register('slug')}
                            error={errors.slug?.message}
                        />
                    </div>

                    <div className="flex justify-center mt-6 mb-4">
                        <Button title="Update Category" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCategory