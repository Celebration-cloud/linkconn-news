/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { showToast } from "@/utils/toast";

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const jobs = [
    {
      title: "News Reporter",
      location: "Remote | Full-Time",
      icon: "pi pi-pencil",
      description:
        "Cover breaking news, interview sources, and deliver stories that shape conversations. Strong research and storytelling skills required.",
    },
    {
      title: "Content Editor",
      location: "Lagos | Hybrid",
      icon: "pi pi-book",
      description:
        "Edit and proofread articles, ensure factual accuracy, and guide reporters on structure, clarity, and tone.",
    },
    {
      title: "Frontend Developer",
      location: "Remote | Contract",
      icon: "pi pi-code",
      description:
        "Build, test, and maintain scalable interfaces using Next.js, Tailwind, and React. Work closely with designers to optimize UX.",
    },
    {
      title: "Video Producer",
      location: "Remote | Freelance",
      icon: "pi pi-video",
      description:
        "Create engaging short and long-form video content for social and news platforms. Strong storytelling through visuals is key.",
    },
    {
      title: "Graphics Designer",
      location: "Hybrid | Contract",
      icon: "pi pi-palette",
      description:
        "Design visuals for articles, infographics, and digital campaigns. Must understand brand consistency and modern design trends.",
    },
  ];

  const handleApply = (jobTitle) => {
    setSelectedJob(jobTitle);
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/public/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, job: selectedJob }),
      });

      const result = await res.json();
      if (result.success) {
        showToast({
          title: "Success",
          description: "Application sent successfully!",
          color: "success",
        });
        reset();
        setIsModalOpen(false);
      } else {
        showToast({
          title: "Error",
          description: "Failed to send. Try again later.",
          color: "danger",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      showToast({
        title: "Error",
        description: "Something went wrong.",
        color: "danger",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16 transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* HERO SECTION */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-blue-600 dark:text-blue-400">
          Build the Future of Journalism with Linkcon News
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          At Linkcon News, we’re redefining modern media. We combine the speed
          of digital journalism with integrity, depth, and creativity. Every
          story we tell aims to inform, challenge, and inspire.
        </p>
        <Button
          className="bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold"
          onPress={() => window.scrollTo({ top: 900, behavior: "smooth" })}
        >
          View Open Positions
        </Button>
      </section>

      {/* OUR MISSION */}
      <section className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Our Mission
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            To deliver accurate, bold, and unbiased journalism that amplifies
            underrepresented voices and drives positive impact across Africa and
            beyond.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Our Vision
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            To be the leading African digital newsroom, inspiring change through
            responsible reporting and innovative storytelling.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Our Culture
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Collaboration, growth, and creativity define us. We give our team
            the freedom to innovate while maintaining the highest journalistic
            standards.
          </p>
        </div>
      </section>

      {/* JOB OPENINGS */}
      <section>
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-8 text-center">
          Current Openings
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <Card
              key={index}
              shadow="sm"
              className="bg-gray-50 dark:bg-gray-900 border dark:border-gray-800"
            >
              <CardHeader className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {job.location}
                  </p>
                </div>
                <i
                  className={`${job.icon} text-blue-600 dark:text-blue-400 text-xl`}
                ></i>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {job.description}
                </p>
                <Button
                  color="primary"
                  className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 font-medium"
                  onPress={() => handleApply(job.title)}
                >
                  Apply Now
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="space-y-8 text-center">
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
          Why Work with Linkcon News?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Remote Flexibility",
              desc: "Work from anywhere while staying connected with a passionate newsroom.",
            },
            {
              title: "Growth Opportunities",
              desc: "We invest in mentorship, upskilling, and continuous learning for every team member.",
            },
            {
              title: "Impactful Work",
              desc: "Your stories influence policy, spark change, and shape public conversations.",
            },
            {
              title: "Collaborative Culture",
              desc: "We work in agile, inclusive teams that value every voice and perspective.",
            },
            {
              title: "Tech + Journalism",
              desc: "We’re building tools that merge technology and storytelling for modern readers.",
            },
            {
              title: "Recognition and Rewards",
              desc: "We celebrate achievements and ensure every contribution gets noticed.",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center text-blue-600 dark:text-blue-400">
          Our Hiring Process
        </h2>
        <ol className="space-y-4 max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          <li>1. Submit your application through this page.</li>
          <li>2. Our HR team reviews your background and qualifications.</li>
          <li>3. Shortlisted candidates are contacted for an interview.</li>
          <li>
            4. Depending on the role, a writing or technical test may follow.
          </li>
          <li>5. Final interviews with senior editors or department leads.</li>
          <li>6. Offer and onboarding. Welcome to Linkcon News.</li>
        </ol>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
          Don’t See a Role That Fits?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          We’re always open to new talent. If you’re passionate about media,
          tech, or storytelling, send us your CV — we’ll keep it on file for
          upcoming opportunities.
        </p>
        <Button
          as="a"
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=ojinguluc@gmail.com&su=Job%20Application&body=Hi,%20I%20want%20to%20apply%20for%20a%20role%20at%20Linkcon%20News.%20Please%20find%20my%20CV%20attached.`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-600 font-semibold text-black dark:bg-amber-400 dark:hover:bg-amber-500"
        >
          Send CV
        </Button>
      </section>

      {/* MODAL FORM */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Apply for {selectedJob}</ModalHeader>
            <ModalBody>
              <Input
                label="Name"
                {...register("name", { required: true })}
                isInvalid={errors.name}
              />
              <Input
                label="Email"
                type="email"
                {...register("email", { required: true })}
                isInvalid={errors.email}
              />
              <Textarea
                label="Message"
                {...register("message", { required: true })}
                isInvalid={errors.message}
              />
              <Input
                label="CV / Portfolio Link"
                {...register("cv", { required: true })}
                isInvalid={errors.cv}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                variant="light"
                onPress={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="bg-blue-600 text-white"
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
