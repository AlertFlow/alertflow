"use client";

import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Snippet,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { LibraryIcon } from "lucide-react";

import { CheckIcon, PlayCircleIcon, PlusIcon } from "@/components/icons";
import AddRunner from "@/lib/fetch/runner/AddRunner";
import CreateRunnerApiKey from "@/lib/fetch/project/POST/CreateRunnerAPIKey";

export default function CreateRunnerModal({
  disclosure,
  project,
  alertflow_runner,
}: {
  disclosure: UseDisclosureReturn;
  project: any;
  alertflow_runner: any;
}) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = disclosure;

  // instructions modal
  const {
    isOpen: isOpenInstructions,
    onOpen: onOpenInstructions,
    onOpenChange: onOpenChangeInstructions,
  } = useDisclosure();
  const [inApikey, setInApikey] = React.useState("");
  const [inRunnerId, setInRunnerId] = React.useState("");

  const [name, setName] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  async function createRunner() {
    setIsLoading(true);

    const response = await AddRunner({
      projectId: project.id ? project.id : "none",
      name,
      alertflow_runner,
    });

    const tokenResponse = await CreateRunnerApiKey({
      projectId: project.id ? project.id : "none",
      description: name + " Runner API key",
    });

    if (response.result === "success" && tokenResponse.result === "success") {
      setName("");
      onOpenChange();

      // set variables
      setInApikey(tokenResponse.key);
      setInRunnerId(response.runner.id);
      onOpenChangeInstructions();
      router.refresh();
    } else {
      toast.error("Failed to create runner");
    }

    setIsLoading(false);
  }

  return (
    <>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center justify-center gap-2 font-bold">
                <PlayCircleIcon />
                Add Runner
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter the runner name"
                  value={name}
                  variant="bordered"
                  onValueChange={setName}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  startContent={<PlusIcon />}
                  onPress={createRunner}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenInstructions}
        placement="center"
        onOpenChange={onOpenChangeInstructions}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center justify-center gap-2 text-success">
                <CheckIcon />
                Runner Created
              </ModalHeader>
              <ModalBody>
                <p>Use the below information to configure your new runner.</p>
                <Divider />
                <div>
                  <p className="text-sm font-bold text-default-400">
                    Runner ID
                  </p>
                  <Snippet hideSymbol className="w-full">
                    {inRunnerId}
                  </Snippet>
                </div>
                <div>
                  <p className="text-sm font-bold text-default-400">API Key</p>
                  <Snippet hideSymbol className="w-full" codeString={inApikey}>
                    <span>{inApikey.slice(0, 30) + "..."}</span>
                  </Snippet>
                  <p className="text-sm text-default-400">
                    The API can always be found on the &quot;API Keys&quot; tab.
                  </p>
                </div>
                <p className="text-sm text-default-500 mt-2">
                  If you need help with the configuration, please click the
                  documentation button below.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  startContent={<LibraryIcon />}
                  variant="bordered"
                  onPress={onClose}
                >
                  Show Documentation
                </Button>
                <Button
                  color="success"
                  startContent={<CheckIcon />}
                  onPress={onClose}
                >
                  <span className="font-bold">Understood</span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}