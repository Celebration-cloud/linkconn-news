/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Button } from "@heroui/react";
import { Textarea } from "@heroui/react"; // HeroUI multiline input
import { Avatar } from "@heroui/react";

export default function ReplyBox({ value, onChange, onCancel, onSubmit }) {
  return (
    <div className="flex gap-2 mt-4">
      <Avatar name="You" size="sm" />
      <div className="w-full">
        <Textarea
          value={value}
          onChange={onChange} // ✅ This is the fix!
          placeholder="Write your reply..."
          minRows={2}
          maxRows={4}
          classNames={{
            base: "bg-default-100 dark:bg-gray-800",
            input: "text-gray-900 dark:text-gray-100",
          }}
        />
        <div className="flex gap-2 mt-2 justify-end">
          <Button size="sm" variant="light" onPress={onCancel}>
            Cancel
          </Button>
          <Button size="sm" color="primary" onPress={onSubmit}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
