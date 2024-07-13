"use client";

import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

import { DeleteDocumentIcon, InfoIcon } from "@/components/icons";
import DeleteProjectRunner from "@/lib/fetch/project/DELETE/DeleteRunner";
import GetRunnerFlowLinks from "@/lib/fetch/runner/GetRunnerFlowLinks";

export default function DeleteRunnerModal({
  disclosure,
  runner,
}: {
  disclosure: UseDisclosureReturn;
  runner: any;
}) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = disclosure;

  const [flowLinks, setFlowLinks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    runner.id && getFlowLinks();
  }, [runner]);

  async function getFlowLinks() {
    const data = await GetRunnerFlowLinks({ runnerId: runner.id });

    if (!data.error) {
      setFlowLinks(data);
    }
  }

  async function deleteRunner() {
    setIsLoading(true);

    const response = await DeleteProjectRunner(runner.id);

    if (response.result === "success") {
      onOpenChange();
      toast.success("Runner deleted successfully");
      router.refresh();
    } else {
      toast.error("Failed to create runner");
    }

    setIsLoading(false);
  }

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center justify-center gap-2 font-bold text-danger">
                <InfoIcon />
                Are you sure?
              </ModalHeader>
              <ModalBody>
                <p>
                  You are about to delete the following runner which{" "}
                  <span className="font-bold">cannot be undone.</span>
                </p>
                <Snippet hideCopyButton hideSymbol>
                  <span>Name: {runner.name}</span>
                  <span>ID: {runner.id}</span>
                </Snippet>
                {flowLinks.length > 0 && (
                  <>
                    <Divider />
                    <p>
                      The runner is assigned to the following flows which will
                      need{" "}
                      <span className="text-warning font-bold">
                        Maintenance
                      </span>{" "}
                      after the runner got deleted:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {flowLinks.map((flow: any) => (
                        <Chip
                          key={flow.id}
                          color="warning"
                          radius="sm"
                          variant="flat"
                        >
                          {flow.name}
                        </Chip>
                      ))}
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isLoading={isLoading}
                  startContent={<DeleteDocumentIcon />}
                  variant="solid"
                  onPress={deleteRunner}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}