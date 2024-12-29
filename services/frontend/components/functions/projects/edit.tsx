"use client";

import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import { Icon, listIcons, loadIcons } from "@iconify/react";
import {
  Avatar,
  Button,
  cn,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { toast } from "sonner";

import UpdateProject from "@/lib/fetch/project/PUT/UpdateProject";
import ErrorCard from "@/components/error/ErrorCard";
import "react-color-palette/css";

export default function EditProjectModal({
  disclosure,
  project,
}: {
  disclosure: UseDisclosureReturn;
  project: any;
}) {
  const router = useRouter();
  const { isOpen, onOpenChange } = disclosure;
  const [icons, setIcons] = React.useState<string[]>([]);

  const [color, setColor] = useColor(project.color ? project.color : "#5213d7");
  const [projectIcon, setProjectIcon] = React.useState(project.icon);
  const [name, setName] = React.useState(project.name);
  const [description, setDescription] = React.useState(project.description);
  const [alertflowRunners, setAlertflowRunners] = React.useState(
    project.alertflow_runners,
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    setProjectIcon(project.icon);
    setName(project.name);
    setDescription(project.description);
    setAlertflowRunners(project.alertflow_runners);
    loadAllSolarIcons();
  }, [project]);

  async function loadAllSolarIcons() {
    await loadIcons(["solar:home-2-linear", "solar:atom-broken"]);
    setIcons(() => listIcons("", "solar"));
  }

  const handleIconChange = (e: any) => {
    setProjectIcon(e.target.value);
  };

  async function updateProject() {
    setIsLoading(true);
    const response = (await UpdateProject(
      project.id,
      name,
      description,
      alertflowRunners,
      projectIcon,
      color.hex,
      project.enable_auto_runners,
      project.disable_runner_join,
    )) as any;

    if (!response) {
      setIsLoading(false);
      setError(true);
      setErrorText(response.error);
      setErrorMessage(response.message);
      toast.error("Failed to update project");

      return;
    }

    if (response.success) {
      router.refresh();
      onOpenChange();
      setIsLoading(false);
      setError(false);
      setErrorText("");
      setErrorMessage("");
      toast.success("Project updated successfully");
    } else {
      setIsLoading(false);
      setError(true);
      setErrorText(response.error);
      setErrorMessage(response.message);
      toast.error("Failed to update project");
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        size="xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-wrap items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-bold">Edit Project</p>
                  <p className="text-sm text-default-500">
                    Edit the project details below and click apply changes to
                    save.
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                {error && (
                  <ErrorCard error={errorText} message={errorMessage} />
                )}
                <div className="grid gap-2 lg:grid-cols-2">
                  <Input
                    label="Name"
                    name="name"
                    placeholder="Enter the project name"
                    value={name}
                    variant="bordered"
                    onValueChange={setName}
                  />
                  <Input
                    label="Description"
                    name="description"
                    placeholder="Enter the project description"
                    value={description}
                    variant="bordered"
                    onValueChange={setDescription}
                  />
                </div>
                <Switch
                  classNames={{
                    base: cn(
                      "inline-flex flex-row-reverse max-w-full bg-content1 hover:bg-content2 items-center",
                      "justify-between cursor-pointer rounded-2xl gap-2 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary",
                    ),
                    wrapper: "p-0 h-4 overflow-visible",
                    thumb: cn(
                      "w-6 h-6 border-2 shadow-lg",
                      "group-data-[hover=true]:border-primary",
                      // selected
                      "group-data-[selected=true]:ml-6",
                      // pressed
                      "group-data-[pressed=true]:w-7",
                      "group-data-[selected]:group-data-[pressed]:ml-4",
                    ),
                  }}
                  isSelected={alertflowRunners}
                  onValueChange={setAlertflowRunners}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-medium">Enable AlertFlow Runners</p>
                    <p className="text-tiny text-default-400">
                      Enable or disable AlertFlow runners.
                    </p>
                  </div>
                </Switch>
                <Divider />
                <Select
                  items={icons.map((icon) => ({ textValue: icon }))}
                  label="Icon"
                  placeholder="Select an icon"
                  selectedKeys={[projectIcon]}
                  size="md"
                  startContent={<Icon icon={projectIcon} width={22} />}
                  onChange={handleIconChange}
                >
                  {(item) => (
                    <SelectItem key={item.textValue} textValue={item.textValue}>
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="shrink-0"
                          color="primary"
                          icon={<Icon icon={item.textValue} width={22} />}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <span className="text-small">{item.textValue}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
                <div>
                  <p className="font-bold">Project Color</p>
                  <p className="text-sm text-default-500">
                    This color appears on the project list
                  </p>
                </div>
                <ColorPicker hideInput color={color} onChange={setColor} />
              </ModalBody>
              <ModalFooter className="grid grid-cols-2">
                <Button color="default" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="warning"
                  isLoading={isLoading}
                  variant="flat"
                  onPress={updateProject}
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}