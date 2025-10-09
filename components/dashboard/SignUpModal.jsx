/* eslint-disable react/react-in-jsx-scope */
// components/SignUpModal.jsx
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
} from "@heroui/react";
import { MailIcon, LockIcon } from "../icons"; // Import your icons

export default function SignUpModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Sign Up
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create Account</ModalHeader>
              <ModalBody>
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <MailIcon className="text-2xl text-default-400" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400" />
                  }
                  label="Password"
                  placeholder="Create a password"
                  type="password"
                  variant="bordered"
                />
                <Checkbox defaultSelected>
                  I agree to the terms and conditions
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign Up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
