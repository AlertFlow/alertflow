"use client";

import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import { Icon } from "@iconify/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import AdminSendUserNotification from "@/lib/fetch/admin/POST/sendUserNotification";
import ErrorCard from "@/components/error/ErrorCard";

export default function AdminSendUserNotificationModal({
  user,
  disclosure,
}: {
  user: any;
  disclosure: UseDisclosureReturn;
}) {
  const router = useRouter();

  const { isOpen, onOpenChange, onClose } = disclosure;

  const [text, setText] = React.useState("");

  // loading
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function sendNotification() {
    setIsLoading(true);
    const response = (await AdminSendUserNotification(user.id, text)) as any;

    if (!response) {
      setError(true);
      setErrorMessage("Failed to send notification");
      setErrorText("Failed to send notification");
      setIsLoading(false);
      toast.error("Failed to send notification");

      return;
    }

    if (response.success) {
      router.refresh();
      onOpenChange();
      setText("");
      setError(false);
      setErrorMessage("");
      setErrorText("");
      toast.success("Notification sent successfully");
    } else {
      setError(true);
      setErrorMessage(response.message);
      setErrorText(response.error);
      toast.error("Failed to send notification");
    }

    setIsLoading(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">
                    Send Notification to {user.username}
                  </p>
                  <p className="text-sm text-default-500">
                    The below message will be displayed to {user.username} when
                    they login.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                {error && (
                  <ErrorCard error={errorText} message={errorMessage} />
                )}
                <Textarea
                  isRequired
                  label="Text"
                  labelPlacement="outside"
                  placeholder=""
                  type="name"
                  value={text}
                  variant="bordered"
                  onValueChange={setText}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  variant="flat"
                  onPress={sendNotification}
                >
                  <Icon icon="solar:map-arrow-right-bold-duotone" width={22} />
                  Send Notification
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}