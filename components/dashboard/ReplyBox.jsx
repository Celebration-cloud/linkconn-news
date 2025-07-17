"use client";

import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input"; // HeroUI multiline input
import { Avatar } from "@heroui/avatar";

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
