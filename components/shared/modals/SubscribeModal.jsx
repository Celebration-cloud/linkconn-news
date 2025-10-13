/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { Logo, MailIcon } from "@/components/icons";

export const SubscribeModal = ({
  title = "Subscribe",
  className = "bg-yellow-400 text-black font-semibold",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // TODO: handle subscribe logic (API call)
    console.log("Subscribed with:", email);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger button */}
      <Button
        {...props}
        className={className}
        onPress={() => setIsOpen(true)}
      >
        {title}
      </Button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="md"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-2">
                <Logo height={50} width={120} />
                <h2 className="text-xl font-bold">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  Stay updated with the latest news, insights, and stories from
                  Linkcon News.
                </p>
              </ModalHeader>

              <ModalBody>
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  endContent={<MailIcon className="text-2xl" />}
                  required
                />
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-yellow-400 text-black font-semibold"
                  onPress={handleSubscribe}
                >
                  Subscribe
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
