import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LableText from "../../Components/LableText";
import InputText from "../../Components/InputText";
import Button from "../../Components/Button";
import slugify from "slugify";
import { getEnv } from "../../Helpers/getEnv";
import { showToast } from "../../Helpers/showToast";
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useState } from "react";
import Editor from "../../Components/Editor";
import { useSelector } from "react-redux";
import {
  Select,
  SelectOption,
  SelectLabel,
} from "../../Components/SelectComponents";
import { RouteBlog } from "../../Helpers/RouteNames";

function AddBlog() {
  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();
  const user = useSelector((state => state.user));
  const navigate = useNavigate();

  const {
    data: CategoryData,
    // loading,
    // error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "GET",
    credentials: "include",
  });

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    blogContent: z
      .string()
      .min(3, "Blog content must be at least 3 characters"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    setValue("blogContent", data);
  };

  const blotTitle = watch("title");

  useEffect(() => {
    if (blotTitle) {
      const slug = slugify(blotTitle, { lower: true });
      setValue("slug", slug);
    }
  }, [blotTitle, setValue]);

  async function onSubmit(values) {
    try {
      // Create the blog data object with author ID
      const blogData = { ...values, author: user.user._id };
      
      // Create form data and append blog data
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      // Send blogData instead of values
      formData.append("data", JSON.stringify(blogData));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/add`,
        {
          method: "post",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message);
      }

      reset();
      setFile(null);
      setPreview(null);
      showToast("success", data.message);
      navigate(RouteBlog);
    } catch (error) {
      showToast("error", error.message);
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

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen p-4">
        <form
          className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center mb-6 text-2xl font-bold text-purple-700">
            Add Category
          </h2>

          <div className="space-y-4">
            <div>
              <LableText labels="Category" />
              <Select onChange={(e) => setValue("category", e.target.value)}>
                <SelectLabel label="Select the category" />
                {CategoryData?.categories?.map((category) => (
                  <SelectOption key={category._id} value={category._id}>
                    {category.name}
                  </SelectOption>
                ))}
              </Select>
            </div>

            <div>
              <LableText labels="Title" />
              <InputText
                placeholder="Enter your title"
                type="text"
                {...register("title")}
                error={errors.title?.message}
              />
            </div>

            <div>
              <LableText labels="Slug" />
              <InputText
                placeholder="Enter your slug"
                type="slug"
                {...register("slug")}
                error={errors.slug?.message}
              />
            </div>
            <div>
              <span className="flex justify-center items-center mb-3 text-gray-700 font-medium ">
                Feature Image
              </span>
              <Dropzone
                onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex justify-center items-center w-35 h-30 border-2 border-dashed border-gray-300 rounded-lg p-4 mx-auto mb-4 relative group">
                        <img src={filePreview} />
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>

            <div>
              <LableText labels="Blog Content" />
              <Editor
                name="blogcontent"
                props={{ initialData: "", onChange: handleEditorData }}
              />
            </div>

            <div className="flex justify-center mt-6 mb-4">
              <Button title="Submit" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
