"use client";

import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import EditRunner from "@/lib/fetch/runner/PUT/Edit";
import ErrorCard from "@/components/error/ErrorCard";

export default function EditRunnerModal({
  disclosure,
  runner,
}: {
  disclosure: UseDisclosureReturn;
  runner: any;
}) {
  const router = useRouter();
  const { isOpen, onOpenChange } = disclosure;

  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    setName(runner.name);
  }, [runner]);

  async function editRunner() {
    setIsLoading(true);

    const response = (await EditRunner(runner.id, name)) as any;

    if (!response) {
      setIsLoading(false);
      setError(true);
      setErrorText("Failed to update runner");
      setErrorMessage("An error occurred while updating the runner");
      toast.error("Failed to update runner");

      return;
    }

    if (response.success) {
      setName("");
      setError(false);
      setErrorText("");
      setErrorMessage("");
      onOpenChange();
      toast.success("Runner updated successfully");
      router.refresh();
    } else {
      setError(true);
      setErrorText(response.error);
      setErrorMessage(response.message);
      toast.error("Failed to update runner");
    }

    setIsLoading(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Edit Runner</p>
                  <p className="text-sm text-default-500">
                    Edit the runner details below and click apply changes to
                    save.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                {error && (
                  <ErrorCard error={errorText} message={errorMessage} />
                )}
                <Input
                  label="Name"
                  labelPlacement="outside"
                  placeholder="Enter the new runner name"
                  value={name}
                  variant="flat"
                  onValueChange={setName}
                />
              </ModalBody>
              <ModalFooter className="grid grid-cols-2">
                <Button color="default" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="warning"
                  isLoading={isLoading}
                  variant="flat"
                  onPress={editRunner}
                >
                  Apply Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}