/* eslint-disable react/react-in-jsx-scope */
"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
  Divider,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import Link from "next/link";
import { showToast } from "@/utils/toast";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [status, setStatus] = useState(null);

  const onSubmit = async (data) => {
    try {
      setStatus("sending");
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        showToast({ title: "success", description: "Message sent successfully!", color: "success" });
        reset();
      } else {
        setStatus("error");
        showToast({ title: "error", description: "Failed to send message. Try again later.", color: "danger" });
      }
    } catch (err) {
      setStatus("error");
      showToast({ title: "error", description: "Failed to send message. Try again later."+err, color: "danger" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-500">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We’d love to hear from you. For support, business inquiries, or media
          relations, reach out using the form below or through our contact info.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <Card className="lg:col-span-2 shadow-md dark:bg-gray-900">
          <CardHeader>
            <h2 className="text-2xl text-blue-500 font-semibold">
              Send Us a Message
            </h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <Input
                label="Full Name"
                placeholder="Enter your name"
                fullWidth
                variant="bordered"
                {...register("name", { required: "Name is required" })}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                fullWidth
                variant="bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email address",
                  },
                })}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
              <Input
                label="Subject"
                placeholder="What’s your message about?"
                fullWidth
                variant="bordered"
                {...register("subject", { required: "Subject is required" })}
                isInvalid={!!errors.subject}
                errorMessage={errors.subject?.message}
              />
              <Textarea
                label="Message"
                placeholder="Write your message here..."
                minRows={5}
                fullWidth
                variant="bordered"
                {...register("message", { required: "Message is required" })}
                isInvalid={!!errors.message}
                errorMessage={errors.message?.message}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white w-full"
                size="lg"
              >
                {isSubmitting
                  ? "Sending..."
                  : status === "success" && "Send Message"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="shadow-md dark:bg-gray-900">
            <CardBody className="space-y-6">
              <div className="flex items-start gap-4">
                <i className="pi pi-map-marker text-blue-600 text-2xl"></i>
                <div>
                  <h3 className="font-semibold text-lg text-blue-500">
                    Office Address
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Linkcon Avenue, Victoria Island, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <i className="pi pi-phone text-blue-500 text-2xl"></i>
                <div>
                  <h3 className="font-semibold text-lg text-blue-500">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    +234 800 123 4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <i className="pi pi-envelope text-blue-500 text-2xl"></i>
                <div>
                  <h3 className="font-semibold text-lg text-blue-500">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    contact@linkconnews.com
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Embedded Google Map */}
          <Card className="shadow-md overflow-hidden bg-white dark:bg-gray-900">
            <CardHeader>
              <h3 className="font-semibold text-lg text-blue-500">Find Us</h3>
            </CardHeader>
            <Divider />
            <CardBody className="p-0">
              <iframe
                title="Linkcon News Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.291272859364!2d3.421871374818007!3d6.453124724747629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4c8d4a2b8c7%3A0x8c44e6d63c2a7260!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1698072000000!5m2!1sen!2sng"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-64 rounded-b-md dark:invert dark:hue-rotate-180"
              ></iframe>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Extra Sections */}
      <div className="space-y-10">
        {/* Press & Media */}
        <Card className="shadow-md dark:bg-gray-900">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-500">
              Press & Media
            </h2>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              For interviews, media kits, or official statements from{" "}
              <strong>Linkcon News</strong>, contact our media relations team.
            </p>
            <p>
              <strong>Email:</strong> media@linkconnews.com
            </p>
            <p>
              <strong>Response time:</strong> within 24–48 business hours
            </p>
          </CardBody>
        </Card>

        {/* Advertising */}
        <Card className="shadow-md dark:bg-gray-900">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-500">
              Advertising & Sponsorships
            </h2>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              Promote your brand or campaign on Linkcon News. We offer multiple
              ad options, including banner placements, sponsored content, and
              newsletter features.
            </p>
            <p>
              <strong>Contact:</strong> ads@linkconnews.com
            </p>
          </CardBody>
        </Card>

        {/* Partnerships */}
        <Card className="shadow-md dark:bg-gray-900">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-500">
              Partnerships & Collaborations
            </h2>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              We collaborate with organizations, media outlets, and creators to
              bring impactful journalism to a wider audience. Let’s grow
              together.
            </p>
            <p>
              <strong>Email:</strong> partnerships@linkconnews.com
            </p>
          </CardBody>
        </Card>

        {/* Support */}
        <Card className="shadow-md dark:bg-gray-900">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-500">Support</h2>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              Having trouble with your account or subscription? 
              {/* Visit our{" "}
              <Link
                href="/help"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Help Center
              </Link>{" "}
              for troubleshooting guides or  */}
              reach out directly to:
            </p>
            <p>
              <strong>Email:</strong> support@linkconnews.com
            </p>
          </CardBody>
        </Card>

        {/* FAQs */}
        <Card className="shadow-md dark:bg-gray-900">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-blue-500">
              Frequently Asked Questions
            </h2>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
            <details className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
              <summary className="cursor-pointer font-semibold text-blue-500">
                How long does it take to get a response?
              </summary>
              <p className="mt-2">
                We usually respond to inquiries within 1–2 business days.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
              <summary className="cursor-pointer font-semibold text-blue-500">
                Do you accept guest articles?
              </summary>
              <p className="mt-2">
                Yes, we welcome guest contributors. Send your proposal to{" "}
                <strong>editor@linkconnews.com</strong>.
              </p>
            </details>

            <details className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
              <summary className="cursor-pointer font-semibold text-blue-500">
                Can I advertise a local business?
              </summary>
              <p className="mt-2">
                Absolutely. We support small and local businesses through our ad
                placement programs. Email <strong>ads@linkconnews.com</strong>{" "}
                to get started.
              </p>
            </details>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
