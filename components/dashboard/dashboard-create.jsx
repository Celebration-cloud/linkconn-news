// DashboardCreate.jsx - with React Hook Form integration

"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import PreviewModal from "./PreviewModal";
import CoverUpload from "./cover-upload";
import { Editor } from "primereact/editor";
import { useSearchParams } from "next/navigation";
import {
  Input as HeroInput,
  Checkbox,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { siteConfig } from "@/config/site";

export default function DashboardCreate() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      summary: "",
      category: "",
      tags: "",
      content: "",
      cover: null,
      isFeatured: false,
    },
  });

  const [showPreview, setShowPreview] = useState(false);
  const searchParams = useSearchParams();
  const articleId = searchParams.get("aid");

  const cover = watch("cover");
  const content = watch("content");
  const title = watch("title");
  const summary = watch("summary");

  useEffect(() => {
    if (articleId) {
      // Load existing article logic
    }
  }, [articleId]);

  const onSubmit = (data, status = "Draft") => {
    const articleData = {
      ...data,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: "user_1234",
        name: "Celebration Ojingulu",
        role: "admin",
      },
      clicks: 0,
      likes: 0,
      dislikes: 0,
      comments: [],
      slug: data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    };

    console.log("✅ Submitting Article:", articleData);
    // Here you would typically send the articleData to your backend API
    // For demonstration, we'll just log it and reset the form
    reset();
    alert(
      `Article ${status === "published" ? "published" : "saved as draft"} successfully!`
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, "published"))}
      className="w-full max-w-5xl mx-auto space-y-8 py-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {articleId ? "Edit Article" : "Create New Article"}
        </h1>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-10">
          <HeroInput
            label="Title"
            labelPlacement="outside"
            placeholder="Headline of your news..."
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
          />

          <HeroInput
            label="Summary"
            labelPlacement="outside"
            placeholder="Brief summary for preview"
            {...register("summary", {
              required: "Summary is required",
              minLength: {
                value: 10,
                message: "Summary must be at least 10 characters",
              },
            })}
            errorMessage={errors.summary?.message}
            isInvalid={!!errors.summary}
          />

          <Controller
            name="category"
            control={control}
            rules={{ required: "Please select a category." }}
            render={({ field }) => (
              <Select
                label="Category"
                labelPlacement="outside"
                placeholder="Select a category"
                selectedKeys={field.value ? [field.value] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  field.onChange(selected);
                }}
                isInvalid={!!errors.category}
                errorMessage={errors.category?.message}
              >
                {siteConfig.categories.map((cat) => (
                  <SelectItem key={cat.key}>{cat.label}</SelectItem>
                ))}
              </Select>
            )}
          />

          <HeroInput
            label="Tags"
            labelPlacement="outside"
            placeholder="Comma-separated tags"
            {...register("tags")}
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
              Cover Image
            </label>
            <CoverUpload
              value={watch("cover")}
              onImageUpload={(url) =>
                setValue("cover", url, { shouldValidate: true })
              }
            />

            {cover && (
              <img
                src={cover}
                alt="Cover preview"
                className="mt-3 w-full h-48 object-cover rounded-md"
              />
            )}
            {errors.cover && (
              <p className="text-sm text-red-500 mt-2">
                {errors.cover.message}
              </p>
            )}
          </div>

          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Checkbox
                isSelected={field.value}
                onValueChange={field.onChange}
                className="text-gray-700 dark:text-gray-300"
              >
                Mark as Featured
              </Checkbox>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Article Content
          </label>
          <Controller
            name="content"
            control={control}
            rules={{
              required: "Content is required",
              minLength: {
                value: 20,
                message: "Content must be at least 20 characters long",
              },
            }}
            render={({ field }) => (
              <Editor
                value={field.value}
                onTextChange={(e) => field.onChange(e.htmlValue)}
                style={{ height: "350px" }}
                className={`rounded-md ${errors.content ? "border border-red-500" : ""}`}
              />
            )}
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">
              {errors.content.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onPress={handleSubmit((data) => onSubmit(data, "Draft"))}
        >
          Save as Draft
        </Button>
        <Button color="primary" type="submit">
          Publish Article
        </Button>
      </div>

      <PreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        summary={summary}
        cover={cover}
        content={content}
      />
    </form>
  );
}
