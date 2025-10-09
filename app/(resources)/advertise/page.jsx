/* eslint-disable react/react-in-jsx-scope */
// app/advertise/page.jsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@heroui/react";
import { siteConfig } from "@/config/site";
import { showToast } from "@/utils/toast";

export default function AdvertisePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true); // start loading
    try {
      const res = await fetch("/api/public/advertise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        showToast({
          title: "Success",
          description: "Message sent successfully!",
          color: "success",
        });
        reset();
        setIsOpen(false);
      } else {
        showToast({
          title: "Error",
          description: "Failed to send message.",
          color: "error",
        });
      }
    } catch (err) {
      console.error(err);
      showToast({
        title: "Error",
        description: "Something went wrong.",
        color: "error",
      });
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Logo */}
      <div className="text-center">
        <Image
          src={siteConfig.logo}
          alt="Linkcon News Logo"
          width={180}
          height={60}
          className="mx-auto"
        />
      </div>

      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
          Advertise with Linkcon News
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Get your brand in front of millions of readers who trust Linkcon News.
          We help businesses grow through impactful media exposure.
        </p>
      </header>

      {/* Why Advertise */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Why Choose Linkcon News?
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We deliver your brand message to the right people through targeted
            ad placements and trusted journalism. Our credibility gives your
            campaigns the authority they need.
          </p>
        </CardBody>
      </Card>

      {/* Audience */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Our Audience
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Over 5 million monthly page views.</li>
            <li>Strong readership across Nigeria, Africa, and the diaspora.</li>
            <li>
              Active social media following across Facebook, X, and Instagram.
            </li>
            <li>
              Educated audience, decision-makers, and young professionals.
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* Advertising Options */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Advertising Options
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Banner Ads – Top, side, and inline placements.</li>
            <li>
              Sponsored Articles – Editorial content with your brand story.
            </li>
            <li>Video Ads – Dynamic brand visuals for higher engagement.</li>
            <li>Newsletter Ads – Reach 100,000+ inboxes weekly.</li>
            <li>Event Coverage – Exclusive mentions and logo placements.</li>
          </ul>
        </CardBody>
      </Card>

      {/* Pricing Packages */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Pricing Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Starter
              </h3>
              <p className="text-gray-700 dark:text-gray-300">₦50,000/month</p>
              <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 mt-2">
                <li>1 Banner Ad Placement</li>
                <li>1 Sponsored Post</li>
                <li>Email Support</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-yellow-100 dark:bg-yellow-600 dark:text-black dark:border-yellow-500">
              <h3 className="font-semibold text-lg">Professional</h3>
              <p>₦120,000/month</p>
              <ul className="list-disc pl-4 text-sm mt-2">
                <li>3 Banner Ads</li>
                <li>2 Sponsored Articles</li>
                <li>Analytics Report</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Enterprise
              </h3>
              <p className="text-gray-700 dark:text-gray-300">₦250,000/month</p>
              <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 mt-2">
                <li>5 Banner Ads</li>
                <li>4 Sponsored Posts</li>
                <li>Full Campaign Management</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Testimonials */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            What Our Clients Say
          </h2>
          <p className="italic text-gray-700 dark:text-gray-300">
            “Advertising with Linkcon News brought us over 60% traffic growth in
            one month.” — <strong>Chika, CEO of NaijaTech</strong>
          </p>
          <p className="italic text-gray-700 dark:text-gray-300">
            “Our sponsored content performed better here than on any social
            media platform.” — <strong>Marketing Lead, FastNet</strong>
          </p>
        </CardBody>
      </Card>

      {/* FAQs */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Q:</strong> How soon will my ad go live?
              <br />
              <strong>A:</strong> Within 24–48 hours after confirmation.
            </li>
            <li>
              <strong>Q:</strong> Can I get a custom campaign?
              <br />
              <strong>A:</strong> Yes, we create tailored ad strategies based on
              your goals.
            </li>
            <li>
              <strong>Q:</strong> Do you offer performance reports?
              <br />
              <strong>A:</strong> Yes, we provide detailed engagement and reach
              reports.
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* Contact */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Start Your Campaign
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Partner with us and amplify your brand voice across Africa and
            beyond.
          </p>
          <Button
            onPress={() => setIsOpen(true)}
            className="bg-yellow-400 text-black dark:bg-yellow-500 dark:text-black px-6 py-3 rounded-lg font-semibold shadow-md"
          >
            Start Advertising
          </Button>
        </CardBody>
      </Card>

      {/* Modal Form */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Advertise with Linkcon News
              </ModalHeader>
              <ModalBody>
                <form
                  id="advertise-form"
                  className="space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Input
                    label="Full Name"
                    {...register("name", { required: "Name is required" })}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                  <Input
                    label="Email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                  <Input
                    label="Company"
                    {...register("company", {
                      required: "Company is required",
                    })}
                    isInvalid={!!errors.company}
                    errorMessage={errors.company?.message}
                  />
                  <Textarea
                    label="Message"
                    {...register("message", {
                      required: "Message is required",
                    })}
                    isInvalid={!!errors.message}
                    errorMessage={errors.message?.message}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="advertise-form"
                  className="bg-yellow-400 text-black dark:bg-yellow-500 dark:text-black font-semibold"
                >
                  {isLoading ? "Sending..." : "Submit"} {/* ✅ loading text */}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
