/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Card, CardBody } from "@heroui/react";

export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600">
          Privacy Policy
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          This Privacy Policy describes how <strong>Linkcon News</strong>{" "}
          collects, uses, and protects your personal information when you visit,
          use, or interact with our website, mobile applications, or any of our
          digital platforms.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Last updated: October 2025
        </p>
      </header>

      {/* 1. Information We Collect */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            1. Information We Collect
          </h2>
          <p>
            We collect information that helps us provide better services, ensure
            platform security, and personalize your experience.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and other details you provide during registration,
              subscriptions, or when contacting us.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              platform, including IP address, browser type, device information,
              and browsing history.
            </li>
            <li>
              <strong>Cookies & Tracking Technologies:</strong> We use cookies,
              web beacons, and analytics tools to understand user engagement and
              improve performance.
            </li>
            <li>
              <strong>Third-party Integrations:</strong> When you interact with
              embedded content such as ads or social media, those platforms may
              also collect your data in accordance with their policies.
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* 2. How We Use the Information */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            2. How We Use the Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              To deliver and personalize news, content, and ads relevant to your
              interests.
            </li>
            <li>
              To communicate updates, newsletters, and service-related
              information.
            </li>
            <li>
              To analyze performance, audience insights, and improve our user
              experience.
            </li>
            <li>To enforce our terms, prevent abuse, and maintain security.</li>
            <li>
              To comply with legal obligations and regulatory requirements.
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* 3. Sharing of Information */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            3. Sharing of Information
          </h2>
          <p>
            We respect your privacy and will never sell your personal
            information. We may share data only under specific conditions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              With trusted partners who provide services like hosting,
              analytics, or communication.
            </li>
            <li>To comply with legal processes or protect our legal rights.</li>
            <li>During mergers, acquisitions, or business transfers.</li>
            <li>
              With advertisers or media partners, only as aggregated and
              anonymized data.
            </li>
          </ul>
        </CardBody>
      </Card>

      {/* 4. Cookies and Tracking */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            4. Cookies and Tracking
          </h2>
          <p>
            Cookies help us recognize you, remember preferences, and measure
            engagement. You can manage or disable cookies through your browser
            settings, but some features might not work properly.
          </p>
          <p>
            We also use analytics tools such as Google Analytics to track
            interactions and improve our platform’s performance.
          </p>
        </CardBody>
      </Card>

      {/* 5. Data Retention and Security */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            5. Data Retention and Security
          </h2>
          <p>
            Your data is retained only as long as necessary to fulfill the
            purposes outlined in this policy. We apply encryption, firewalls,
            and secure access control to protect all personal information.
          </p>
          <p>
            While we take strong precautions, no online platform is completely
            secure. You are encouraged to protect your own login credentials and
            avoid sharing sensitive details in comments or forms.
          </p>
        </CardBody>
      </Card>

      {/* 6. Your Rights and Choices */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            6. Your Rights and Choices
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, correct, or delete your personal data.</li>
            <li>Withdraw consent for data processing.</li>
            <li>Opt out of newsletters or promotional emails.</li>
            <li>Adjust cookie preferences in your browser.</li>
          </ul>
        </CardBody>
      </Card>

      {/* 7. Third-Party Links and Services */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            7. Third-Party Links and Services
          </h2>
          <p>
            Our site may include links to external websites or embedded
            third-party content (like YouTube videos or ads). We are not
            responsible for the privacy practices of those platforms. Review
            their policies before sharing personal information.
          </p>
        </CardBody>
      </Card>

      {/* 8. Updates to This Policy */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            8. Updates to This Policy
          </h2>
          <p>
            We update our privacy policy periodically to reflect new legal
            requirements, platform changes, or user feedback. Significant
            updates will be communicated through our website or email
            notifications.
          </p>
        </CardBody>
      </Card>

      {/* 9. Contact Us */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-4 text-center">
          <h2 className="text-2xl font-bold text-blue-600">9. Contact Us</h2>
          <p>
            For privacy-related questions, data requests, or complaints, contact
            our data protection team.
          </p>
          <div className="space-y-2">
            <p>
              <i className="pi pi-envelope mr-1"></i> <strong>Email:</strong>{" "}
              privacy@linkconnews.com
            </p>
            <p>
              <i className="pi pi-phone mr-1"></i> <strong>Phone:</strong>{" "}
              +234-800-123-4567
            </p>
            <p>
              <i className="pi pi-map-marker mr-1"></i>{" "}
              <strong>Address:</strong> Linkcon Media HQ, Lagos, Nigeria
            </p>
          </div>
        </CardBody>
      </Card>

      {/* 10. Children’s Privacy */}
      <Card className="dark:bg-primary-50 shadow-md">
        <CardBody className="space-y-3">
          <h2 className="text-2xl font-bold text-blue-600">
            10. Children’s Privacy
          </h2>
          <p>
            Our services are not directed toward children under 13. We do not
            knowingly collect personal data from minors. If you believe a child
            has provided information to us, please contact our team to have it
            removed.
          </p>
        </CardBody>
      </Card>
    </section>
  );
}
