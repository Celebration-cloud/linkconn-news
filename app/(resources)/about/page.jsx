/* eslint-disable react/react-in-jsx-scope */
"use client";

import { SubscribeModal } from "@/components/shared/modals/SubscribeModal";
import { siteConfig } from "@/config/site";
import { Card, CardBody, CardHeader, Divider, Image } from "@heroui/react";
import { motion } from "framer-motion";
import { CategoryIcon } from "@/lib/category-themes";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, when: "beforeChildren" },
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-16 bg-[var(--canvas)] pb-24 text-[var(--ink)] transition-colors min-[720px]:space-y-20">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden rounded-3xl bg-[#0b3474] px-3 pt-16 text-center text-white shadow-2xl min-[375px]:px-5 min-[720px]:px-6 min-[720px]:pt-24"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-cyan-300 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-900 opacity-20 rounded-full animate-pulse"></div>
        <h1 className="mb-6 text-[clamp(2.25rem,10vw,3.75rem)] font-extrabold leading-tight drop-shadow-lg">
          About Linkcon News
        </h1>
        <p className="mx-auto max-w-3xl text-[clamp(1rem,4.5vw,1.5rem)] leading-relaxed opacity-90">
          Telling stories that shape Nigeria, Africa, and the world. Fast,
          accurate, and meaningful — every story deserves clarity.
        </p>
        <div className="mt-12 flex justify-center">
          <div className="relative w-52 h-52 md:w-80 md:h-80">
            <Image
              src={siteConfig.logo}
              alt="Linkcon newsroom"
              fill
              style={{ objectFit: "contain", borderRadius: "1rem" }}
              className="shadow-2xl border-4 border-white dark:border-gray-800"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-royalblue-600 to-cyan-500">
          Our Story
        </h2>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
          Linkcon News started with one question — how do we make credible news
          accessible without noise or bias? Founded in Lagos, Nigeria, our
          newsroom blends journalists, digital innovators, and storytellers who
          believe truth still matters.
        </p>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          From politics to culture, we focus on clarity, accountability, and
          real impact. Our team covers stories that shape communities —
          amplifying voices often overlooked and connecting local issues to
          global conversations.
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {siteConfig.missionVision.map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="transform hover:scale-105 transition-transform"
          >
            <Card
              className={`rounded-3xl overflow-hidden ${item.bg} shadow-lg`}
            >
              <CardHeader className={`text-xl font-bold ${item.color} p-6`}>
                {item.title}
              </CardHeader>
              <Divider />
              <CardBody className="p-6">{item.content}</CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* Editorial Principles */}
      <motion.section
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-royalblue-600 to-cyan-500">
          Editorial Principles
        </h2>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
          Our newsroom operates under accuracy before speed, truth before
          trends. Every story is reviewed for fairness, balance, and verified
          sourcing.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200">
          <li>Fact-check every claim and prioritize transparency.</li>
          <li>Separate news from opinion to ensure clarity.</li>
          <li>Hold power accountable regardless of influence or position.</li>
        </ul>
      </motion.section>

      {/* What We Cover */}
      <motion.section
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-royalblue-600 to-cyan-500">
          What We Cover
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.covers.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-3xl">
                <CardHeader className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="text-[var(--brand)]"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <CategoryIcon category={item.title} className="size-8" />
                  </motion.div>
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </span>
                </CardHeader>
                <CardBody className="text-gray-700 dark:text-gray-300">
                  {item.desc}
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Milestones */}
      <motion.section
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-royalblue-600 to-cyan-500">
          Milestones
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-800 dark:text-gray-200">
          <li>
            2022: Linkcon News launched in Lagos as a digital-first newsroom.
          </li>
          <li>
            2023: Partnered with independent reporters in 12 Nigerian states.
          </li>
          <li>2024: Reached 1 million monthly readers across Africa.</li>
          <li>2025: Expanded coverage to diaspora news and data journalism.</li>
        </ul>
      </motion.section>

      {/* Meet the Team */}
      <motion.section
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-royalblue-600 to-cyan-500">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.team.map((member, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="rounded-2xl p-6 text-center place-items-center bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={siteConfig.logo}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-royalblue-400 dark:border-cyan-500"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {member.name}
              </h3>
              <p className="text-royalblue-600 dark:text-royalblue-400 font-medium">
                {member.role}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Subscribe */}
      <motion.section
        className="max-w-5xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-royalblue-600 to-cyan-500">
          Join the Conversation
        </h2>
        <p className="text-gray-800 dark:text-gray-200 mb-6">
          Linkcon News is more than a platform — it’s a community built on
          truth, curiosity, and dialogue. Share your opinion, collaborate, or
          partner with us to strengthen public discourse.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-block"
        >
          <SubscribeModal
            className="rounded-full px-10 py-4 bg-royalblue-600 hover:bg-royalblue-700 text-white font-bold shadow-lg transition-all duration-200 dark:bg-royalblue-500 dark:hover:bg-royalblue-600"
            color="primary"
            size="lg"
            title="Subscribe Now"
          />
        </motion.div>
      </motion.section>
    </div>
  );
}
