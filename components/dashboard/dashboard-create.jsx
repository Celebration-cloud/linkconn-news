// DashboardCreate.jsx - with React Hook Form integration

"use client";


import { useForm, Controller } from "react-hook-form";
import React,{ useEffect, useState } from "react";
import PreviewModal from "./PreviewModal";
import CoverUpload from "./cover-upload";
import { Editor } from "primereact/editor";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Input as HeroInput,
  Checkbox,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { addToast } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { updatePublisherThunk } from "@/store/publisherSlice";
import { createArticleThunk, fetchArticleByIdThunk, updateArticleThunk } from "@/store/articleSlice";
import { SpinnerLoading } from "../spinner-loading";

const MAX_WORDS = 800;
const MAX_CHARACTERS = 5000;

// Helper functions
function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}
function countChars(text) {
  if (!text) return 0;
  return text.length;
}

export default function DashboardCreate() {
  const publisher = useSelector((state) => state.publisher.data);
  const [isLoading, setIsLoading] = useState(false);
  const [wasPublished, setWasPublished] = useState(false); // 🆕
  

  const dispatch = useDispatch();
  const router = useRouter();
  // const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  // const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  console.log(publisher);
  const { user } = useUser();
  const {
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
  console.log("cover:", cover);

  const plainContent = stripHtml(content);
  const wordCount = countWords(plainContent);
  const charCount = countChars(plainContent);
  const isWordLimitExceeded = wordCount > MAX_WORDS;
  const isCharLimitExceeded = charCount > MAX_CHARACTERS;

  useEffect(() => {
    if (articleId) {
      setIsLoading(true);
      dispatch(fetchArticleByIdThunk(articleId)).then(({ payload }) => {
        const article = payload?.data;
        if (article) {
          reset({
            title: article.title,
            summary: article.summary,
            category: article.category,
            tags: article.tags?.join(", "),
            cover: article.cover || null,
            isFeatured: article.isFeatured || false,
            content: "",
          });
          if (article.status === "published") {
            setWasPublished(true); // 🆕
          }
          
          setTimeout(() => {
            setValue("content", article.content);
          }, 0);
        }
      });
      setIsLoading(false);
    }
  }, [articleId]);

  const onSubmit = async (data, status = "Draft") => {
    const articleData = {
      ...data,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status,
      authorName: user.fullName,
      authorRole: "admin",
      clicks: 0,
      likes: 0,
      dislikes: 0,
      comments: 0,
      shares: 0,
      impressions: 0,
      slug: data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    };

    try {
      setIsLoading(true);

      if (articleId) {
        dispatch(updateArticleThunk({ id: articleId, data: articleData }));
      } else {
        dispatch(createArticleThunk(articleData));
      }
      // Only update publisher stats if new article is published
      if (articleData.status === "published") {
        dispatch(
          updatePublisherThunk({
            published: publisher?.published + 1,
            liked: publisher?.liked,
            followers: publisher?.followers,
            following: publisher?.following,
          })
        );
      }

      reset();
      router.replace("/admin/content-library");
    } catch (error) {
      addToast({
        title: "Failed to submit article",
        description: error.message,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (wasPublished) {
    addToast({
      title: "Already Published",
      description: "This article has already been published.",
      type: "info",
    });
    router.replace("/admin/content-library");
    return;
  }

  if (articleId && isLoading) return (<SpinnerLoading />);

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
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <HeroInput
                {...field}
                label="Title"
                labelPlacement="outside"
                className="!opacity-100 !visible !block"
                placeholder="Headline of your news..."
                errorMessage={error?.message}
                isInvalid={!!error}
              />
            )}
          />
          <Controller
            name="summary"
            control={control}
            rules={{
              required: "Summary is required",
              minLength: {
                value: 10,
                message: "Summary must be at least 10 characters",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <HeroInput
                {...field}
                label="Summary"
                labelPlacement="outside"
                className="!opacity-100 !visible !block"
                placeholder="Brief summary for preview"
                errorMessage={error?.message}
                isInvalid={!!error}
              />
            )}
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
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <HeroInput
                {...field}
                label="Tags"
                labelPlacement="outside"
                placeholder="Comma-separated tags"
              />
            )}
          />
          <div className="space-y-2">
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
              Cover Image
            </label>
            <CoverUpload
              value={watch("cover")}
              onImageUpload={(url) => {
                console.log("✅ Uploaded cover URL:", url);
                setValue("cover", url, { shouldValidate: true });
              }}
            />

            {cover && (
              <Image
                src={cover}
                alt="Cover preview"
                unoptimized={true}
                width={800} // or whatever size fits your design
                height={192} // for h-48 (48 x 4 = 192px)
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
              validate: {
                maxWords: (value) =>
                  countWords(stripHtml(value)) <= MAX_WORDS ||
                  `Maximum ${MAX_WORDS} words allowed`,
                maxChars: (value) =>
                  countChars(stripHtml(value)) <= MAX_CHARACTERS ||
                  `Maximum ${MAX_CHARACTERS} characters allowed`,
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
          <div className="flex gap-4 text-xs mt-1">
            <span className={isWordLimitExceeded ? "text-red-500" : ""}>
              Words: {wordCount}/{MAX_WORDS}
            </span>
            <span className={isCharLimitExceeded ? "text-red-500" : ""}>
              Characters: {charCount}/{MAX_CHARACTERS}
            </span>
          </div>
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
          isLoading={isLoading}
          onPress={handleSubmit((data) => onSubmit(data, "Draft"))}
        >
          Save as Draft
        </Button>
        <Button color="primary" isLoading={isLoading} type="submit">
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
