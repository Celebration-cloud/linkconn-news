/* eslint-disable react/react-in-jsx-scope */
// app/article/[slug]/components/Comments.jsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardBody, Input, Textarea, Button } from "@heroui/react";

export default function Comments({ articleId }) {
  const [items, setItems] = useState([
    {
      id: "c1",
      name: "Aisha",
      message: "Great analysis—looking forward to more reporting on this.",
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data) => {
    // Fake latency
    await new Promise((r) => setTimeout(r, 500));
    setItems((prev) => [
      {
        id: `c-${prev.length + 1}`,
        name: data.name,
        message: data.message,
      },
      ...prev,
    ]);
    reset();
  };

  return (
    <div className="grid md:grid-cols-5 gap-6">
      {/* Form */}
      <Card className="md:col-span-2 shadow">
        <CardBody className="space-y-3">
          <h3 className="text-lg font-semibold text-blue-700">
            Leave a comment
          </h3>
          <Input
            label="Name"
            variant="bordered"
            {...register("name", { required: "Name is required" })}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            variant="bordered"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Textarea
            label="Message"
            minRows={4}
            variant="bordered"
            {...register("message", {
              required: "Message is required",
              minLength: { value: 10, message: "At least 10 characters" },
            })}
            isInvalid={!!errors.message}
            errorMessage={errors.message?.message}
          />
          <Button
            color="primary"
            className="bg-blue-600 text-white"
            isLoading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            Post Comment
          </Button>
        </CardBody>
      </Card>

      {/* List */}
      <div className="md:col-span-3 space-y-4">
        {items.map((c) => (
          <Card key={c.id} className="shadow">
            <CardBody className="space-y-1">
              <p className="text-sm">
                <i className="pi pi-user text-blue-500 mr-1" />
                <span className="font-medium">
                  {c.name}
                </span> • {new Date(c.createdAt).toLocaleString()}
              </p>
              <p className="">{c.message}</p>
            </CardBody>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
