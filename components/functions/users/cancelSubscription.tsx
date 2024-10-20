"use client";

import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import CancelSubscription from "@/lib/fetch/user/cancelSubscription";

export default function CancelSubscriptionModal({
  disclosure,
}: {
  disclosure: UseDisclosureReturn;
}) {
  const router = useRouter();
  const { isOpen, onOpenChange } = disclosure;

  const [isLoading, setIsLoading] = React.useState(false);

  async function cancelSubscription() {
    setIsLoading(true);
    const response = await CancelSubscription();

    if (!response.error) {
      router.refresh();
      onOpenChange();
      setIsLoading(false);
      toast.success("Your subscription has been cancelled");
    } else {
      setIsLoading(false);
      toast.error("Failed to cancel subscription");
    }
  }

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="center"
        size="lg"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Are you sure?</p>
                  <p className="text-sm text-default-500">
                    You are about to cancel your subscription and will be
                    downgraded to the free Hobby plan after your current period
                    ended.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                Your current subscription will be cancelled and you will remain
                till the end of your current billing period. After that, you
                will be downgraded to the free Hobby plan.
                <Divider />
                <div>
                  <p className="text-warning font-bold text-lg">Caution!</p>
                  <p className="font-bold">
                    Projects and Flows exceeding the free plan limits will be
                    disabled. You can always upgrade your plan to re-enable
                    them.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="grid grid-cols-2">
                <Button color="default" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isLoading={isLoading}
                  variant="solid"
                  onPress={cancelSubscription}
                >
                  Cancel Subscription
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}