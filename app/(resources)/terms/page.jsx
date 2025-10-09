/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Card, CardBody } from "@heroui/react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
          Terms of Service
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Last Updated: August 29, 2025
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          These Terms govern your use of Linkcon News and its associated
          services. By using our platform, you agree to comply with these terms.
          Please review them carefully before proceeding.
        </p>
      </header>

      {/* Section 1: Acceptance */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing Linkcon News, you confirm that you accept these Terms
            of Service and agree to comply with them. If you disagree with any
            part, you must stop using our services immediately.
          </p>
        </CardBody>
      </Card>

      {/* Section 2: User Responsibilities */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            2. User Responsibilities
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate information when creating accounts.</li>
            <li>
              Avoid posting content that is illegal, defamatory, or harmful.
            </li>
            <li>Do not attempt to breach, damage, or overload our systems.</li>
            <li>
              Respect intellectual property rights and do not plagiarize
              content.
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* Section 3: Intellectual Property */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            3. Intellectual Property
          </h2>
          <p>
            All materials on Linkcon News, including text, graphics, videos, and
            trademarks, are the property of Linkcon News or its licensors. You
            may not reproduce or distribute our content without written consent.
          </p>
        </CardBody>
      </Card>

      {/* Section 4: Third-Party Links */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            4. Third-Party Links
          </h2>
          <p>
            Our platform may contain links to external websites for convenience.
            Linkcon News is not responsible for the content or privacy practices
            of third-party platforms.
          </p>
        </CardBody>
      </Card>

      {/* Section 5: Advertising & Sponsored Content */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            5. Advertising and Sponsored Content
          </h2>
          <p>
            Some articles or sections of our site may include sponsored
            materials or advertisements. Such content will always be labeled for
            transparency. Linkcon News is not responsible for third-party
            product claims or offers.
          </p>
        </CardBody>
      </Card>

      {/* Section 6: Limitation of Liability */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            6. Limitation of Liability
          </h2>
          <p>
            While we aim for accuracy, we do not guarantee that all content on
            Linkcon News is error-free. We are not liable for losses resulting
            from the use or reliance on our information.
          </p>
        </CardBody>
      </Card>

      {/* Section 7: Modifications */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            7. Modifications to These Terms
          </h2>
          <p>
            Linkcon News reserves the right to update these Terms of Service
            periodically. You are encouraged to review this page regularly to
            stay informed of any changes.
          </p>
        </CardBody>
      </Card>

      {/* Section 8: Governing Law */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            8. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of Nigeria. Any legal disputes
            will be resolved in the courts of Lagos, Nigeria.
          </p>
        </CardBody>
      </Card>

      {/* Section 9: Contact */}
      <Card className="shadow-md bg-gray-50 dark:bg-gray-900">
        <CardBody className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            9. Contact Us
          </h2>
          <p>
            For questions regarding these Terms, please reach out via our{" "}
            <Link
              href="/contact"
              className="text-blue-600 font-semibold hover:underline"
            >
              Contact Page
            </Link>{" "}
            or email{" "}
            <a
              href="mailto:legal@linkconnews.com"
              className="text-blue-600 hover:underline"
            >
              legal@linkconnews.com
            </a>
            .
          </p>
        </CardBody>
      </Card>
    </section>
  );
}
