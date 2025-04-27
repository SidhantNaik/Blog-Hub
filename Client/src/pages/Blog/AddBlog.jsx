import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";

const AddBlog = () => {
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 charchter long"),
    title: z.string().min(3, "Title must be at least 3 charchter long"),
    slug: z.string().min(3, "Slug must be at least 3 charchter long"),
    blogContent: z
      .string()
      .min(3, "Blog content must be at least 3 charchter long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const blogTitle = form.watch("name");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  async function onSubmit(values) {
    // try {
    //   const response = await fetch(
    //     `${getEnv("VITE_API_BASE_URL")}/category/add`,
    //     {
    //       method: "post",
    //       headers: { "content-type": "application/json" },
    //       body: JSON.stringify(values),
    //     }
    //   );
    //   const data = await response.json();
    //   if (!response.ok) {
    //     return showToast("error", data.message || "Registration failed.");
    //   }
    //   form.reset();
    //   showToast("success", data.message || "Registration successful!.");
    // } catch (error) {
    //   showToast("error", error.message || "Something went wrong.");
    // }
  }
  return (
    <div>
      <Card className="pt-5 ">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.category.length > 0 &&
                              categoryData.category.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Category
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
