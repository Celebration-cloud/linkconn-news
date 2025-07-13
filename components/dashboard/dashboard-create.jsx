"use client";

import { useEffect, useState } from "react";
import { Input, Checkbox, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Editor } from "primereact/editor";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import CoverUpload from "./cover-upload";
import { useSearchParams } from "next/navigation";

export const metadata = {
  title: "Create Article - Linkcon News",
  description: "Publish a new story on Linkcon News",
};

export default function DashboardCreate() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [cover, setCover] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const searchParams = useSearchParams();
    const articleId = searchParams.get("aid");
  // Fetch article data if `articleId` is present
  useEffect(() => {
    if (articleId) {
      // fetch logic here to load article details for editing
    }
  }, [articleId]);
  
  const validateForm = () => {
    const newErrors = {};
    if (!title || title.trim().length < 5)
      newErrors.title = "Title must be at least 5 characters.";
    if (!summary || summary.trim().length < 10)
      newErrors.summary = "Summary must be at least 10 characters.";
    if (!category || category.trim().length < 3)
      newErrors.category = "Category must be at least 3 characters.";
    if (!content || content.trim().length < 20)
      newErrors.content = "Content must be at least 20 characters long.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (validateForm()) {
      // Proceed with API submission
      console.log({
        title,
        summary,
        category,
        tags,
        content,
        isFeatured,
        status: "published",
      });
      alert("Article published successfully!");
    }
  };
  const handleSaveDraft = () => {
    if (validateForm()) {
    // Example logic: Save draft without full validation
      console.log({
        title,
        summary,
        category,
        tags,
        content,
        isFeatured,
        status: "Draft",
      });
      alert("Draft saved successfully!");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {articleId ? "Edit Article" : "Create New Article"}
        </h1>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs Section */}
        <div className="space-y-10">
          <Input
            isRequired
            label="Title"
            name="title"
            labelPlacement="outside"
            value={title}
            placeholder="Headline of your news..."
            onChange={(e) => setTitle(e.target.value)}
            validate={() => errors.title || null}
            isInvalid={!!errors.title}
            errorMessage={errors.title}
          />

          <Input
            isRequired
            label="Summary"
            name="summary"
            labelPlacement="outside"
            value={summary}
            placeholder="Brief summary for preview"
            onChange={(e) => setSummary(e.target.value)}
            validate={() => errors.summary || null}
            isInvalid={!!errors.summary}
            errorMessage={errors.summary}
          />

          <Input
            isRequired
            label="Category"
            name="category"
            labelPlacement="outside"
            value={category}
            placeholder="e.g. Politics, Health"
            onChange={(e) => setCategory(e.target.value)}
            validate={() => errors.category || null}
            isInvalid={!!errors.category}
            errorMessage={errors.category}
          />

          <Input
            label="Tags"
            name="tags"
            labelPlacement="outside"
            value={tags}
            placeholder="Comma-separated tags"
            onChange={(e) => setTags(e.target.value)}
          />

          {/* Cover Upload (can integrate component later) */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
              Cover Image
            </label>
            <CoverUpload onImageUpload={setCover} />
            {cover && (
              <img
                src={cover}
                alt="Cover preview"
                className="mt-3 w-full h-48 object-cover rounded-md"
              />
            )}
          </div>

          <Checkbox
            isSelected={isFeatured}
            onValueChange={setIsFeatured}
            className="text-gray-700 dark:text-gray-300"
          >
            Mark as Featured
          </Checkbox>
        </div>

        {/* Right side: Editor */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            Article Content
          </label>
          <Editor
            value={content}
            onTextChange={(e) => setContent(e.htmlValue)}
            style={{ height: "350px" }}
            className={`rounded-md ${
              errors.content ? "border border-red-500" : ""
            }`}
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">{errors.content}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          onPress={handleSaveDraft}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-sm font-medium"
        >
          Save as Draft
        </Button>

        <Button
          onPress={handlePublish}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
        >
          Publish Article
        </Button>
      </div>

      {/* Preview */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        placement="center"
        size="sm"
        scrollBehavior="inside"
        hideCloseButton
        backdrop="blur"
      >
        <ModalContent>
          <div className="w-[375px] h-[667px] bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-xl overflow-y-scroll scrollbar-hide">
            <ModalHeader className="text-center text-lg font-semibold border-b border-gray-200 dark:border-gray-700">
              📱 Article Preview
            </ModalHeader>
            <ModalBody className="overflow-y-auto p-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{summary}</p>
              {cover && (
                <img
                  src={cover}
                  alt="Preview Cover"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <div
                className="prose dark:prose-invert max-w-none text-sm"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button
                variant="flat"
                onPress={() => setShowPreview(false)}
                className="text-blue-600 hover:underline"
              >
                Close Preview
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
