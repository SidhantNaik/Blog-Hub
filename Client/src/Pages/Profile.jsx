import LableText from '../Components/LableText';
import InputText from '../Components/InputText';
import Button from '../Components/Button';
import { getEnv } from '../Helpers/getEnv';
import { useSelector } from 'react-redux';
import { useFetch } from '../Hooks/useFetch';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Loading from '../Components/Loading';
import { showToast } from '../Helpers/showToast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/user/user.slice';
import { useEffect, useState } from 'react';
import { IoCamera } from "react-icons/io5";
import Dropzone from 'react-dropzone';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [filePreview, setPreview] = useState();
    const [file, setFile] = useState();

    // Add default avatar URL
    const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    const { data: userData, loading, error } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
        { method: 'get', credentials: 'include' }
    );

    const formSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 character long."),
        email: z.string().email(),
        bio: z.string().min(5, "Bio must be at least 5 character long."),
        password: z.string()
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            bio: '',
            password: ''
        }
    });

    useEffect(() => {

        if (userData?.user) {
            form.reset({
                name: userData.user?.name || '',
                email: userData.user?.email || '',
                bio: userData.user?.bio || '',
                password: ''
            });
        }
    }, [userData, form]);

    async function onSubmit(values) {

        try {
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            formData.append('data', JSON.stringify(values));

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${user.user._id}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                return showToast('error', data.message);
            }

            dispatch(setUser(data.user));
            showToast('success', data.message);

        } catch (error) {
            showToast('error', error.message);
        }
    }

    const handleFileSelection = (files) => {
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);
            const preview = URL.createObjectURL(selectedFile);
            setPreview(preview);
        }
    };

    if (loading || !user?.user?._id) return <Loading />;
    if (error) return <div className="text-center py-8 text-red-500">Error loading profile data</div>;

    return (
        <div className="flex justify-center items-center py-8">
            <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">Profile</h2>

                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="mx-auto mb-4 relative group">
                                    <img
                                        src={filePreview || user.user?.avatar || defaultAvatar}
                                        alt={user.user?.name || "Profile Photo"}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 group-hover:opacity-30 object-cover border-2 border-purple-200"
                                        onError={(e) => {
                                            console.log('Image failed to load, using default');
                                            e.target.src = defaultAvatar;
                                        }}
                                    />
                                    <IoCamera className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/4 w-1/4 cursor-pointer text-purple-600 hidden group-hover:block" />
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>

                <div className="mb-4">
                    <LableText labels="Name" />
                    <InputText
                        placeholder="Enter your name"
                        type="text"
                        {...form.register('name')}
                        error={form.formState.errors.name?.message}
                    />
                </div>

                <div className="mb-4">
                    <LableText labels="Email" />
                    <InputText
                        placeholder="Enter your email"
                        type="email"
                        {...form.register('email')}
                        error={form.formState.errors.email?.message}
                    />
                </div>

                <div className="mb-4">
                    <LableText labels="Bio" />
                    <textarea
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your Bio"
                        {...form.register('bio')}
                    />
                    {form.formState.errors.bio && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.bio.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <LableText labels="Password" />
                    <InputText
                        placeholder="Enter your Password"
                        type="password"
                        {...form.register('password')}
                        error={form.formState.errors.password?.message}
                    />
                </div>

                <div className="flex justify-center mt-6 mb-4">
                    <Button title="Update Profile" type="submit" />
                </div>
            </form>
        </div>
    );
}

export default Profile;
