import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import SimulatePayload from "@/lib/fetch/payload/send";

export default function SimulatePayloadModal({
  disclosure,
  flow,
}: {
  disclosure: UseDisclosureReturn;
  flow: any;
}) {
  const { isOpen, onOpenChange } = disclosure;

  const [isLoading, setIsLoading] = React.useState(false);
  const [target, setTarget] = React.useState(
    `${process.env.NEXT_PUBLIC_API_URL}/payloads/alertmanager`,
  );
  const [payload, setPayload] = React.useState(`{
  "receiver": "${flow.id}",
  "status": "firing",
  "alerts": [
    {
      "status": "firing",
      "labels": {
        "alertname": "Test",
        "dc": "eu-west-1",
        "instance": "localhost:9090",
        "job": "prometheus24"
      },
      "annotations": {
        "description": "some description"
      },
      "startsAt": "2018-08-03T09:52:26.739266876+02:00",
      "endsAt": "0001-01-01T00:00:00Z",
      "generatorURL": "http://example.com:9090"                                                                                  
    }
  ],
  "groupLabels": {
    "alertname": "Test",
    "job": "prometheus24"
  },
  "commonLabels": {
    "alertname": "Test",
    "dc": "eu-west-1",
    "instance": "localhost:9090",
    "job": "prometheus24"
  },
  "commonAnnotations": {
    "description": "some description"
  },
  "externalURL": "http://example.com:9093",
  "version": "4",
  "groupKey": "test"
}`);

  async function sendPayload() {
    setIsLoading(true);
    const res = await SimulatePayload(target, payload);

    if (res && !res.error) {
      console.log("Payload sent");
    }

    onOpenChange();
    setIsLoading(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        scrollBehavior="inside"
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Simulate an Payload</p>
                  <p className="text-sm text-default-500">
                    With this Simulation you can test your Flow with a
                    predefined payload.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <Input
                  description="The target URL where the payload will be sent to."
                  label="Target"
                  labelPlacement="outside"
                  value={target}
                  onValueChange={setTarget}
                />
                <Textarea
                  isRequired
                  label="Payload JSON"
                  labelPlacement="outside"
                  maxRows={65}
                  value={JSON.parse(JSON.stringify(payload, null, 2))}
                  onValueChange={setPayload}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="secondary"
                  variant="flat"
                  onPress={sendPayload}
                >
                  <Icon icon="solar:play-bold-duotone" width={20} />
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}