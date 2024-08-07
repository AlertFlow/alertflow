"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  User,
  Divider,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { DeleteDocumentIcon, DeleteIcon } from "@/components/icons";
import RemoveProjectMember from "@/lib/fetch/project/DELETE/removeProjectMember";

export default function DeleteMemberModal({
  projectID,
  user,
  members,
  currentUser,
}: any) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  function handleOpen() {
    if (
      members.filter((m: any) => m.user_id === currentUser.id)[0].role !==
      "Viewer"
    ) {
      onOpen();
    }
  }

  async function handleDeleteMember() {
    setIsDeleteLoading(true);

    const res = await RemoveProjectMember(projectID, user.user_id);

    if (res.error) {
      setIsDeleteLoading(false);
      toast.error(res.error);

      return;
    } else {
      setIsDeleteLoading(false);
      onOpenChange();
      toast.success("Member removed successfully");
      router.refresh();
    }

    setIsDeleteLoading(false);
  }

  return (
    <>
      <DeleteIcon onClick={handleOpen} />
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center justify-center gap-2 text-danger">
                <DeleteDocumentIcon />
                Remove Member from Project
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to remove this User from the Project?
                </p>
                <Divider />
                <User
                  avatarProps={{ radius: "lg", name: user.username }}
                  className="justify-start"
                  description={
                    <p>
                      {user.email} | {user.role}
                    </p>
                  }
                  name={user.username}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isLoading={isDeleteLoading}
                  onPress={handleDeleteMember}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
