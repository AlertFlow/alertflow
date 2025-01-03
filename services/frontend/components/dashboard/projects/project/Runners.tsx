import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Spacer,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import TimeAgo from "react-timeago";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";

import { VerticalDotsIcon } from "@/components/icons";
import RunnerDrawer from "@/components/functions/runner/plugins";
import DeleteRunnerModal from "@/components/functions/runner/delete";
import CreateRunnerModal from "@/components/functions/runner/create";

import ProjectRunnerDetails from "./RunnerDetails";

export default function Runners({
  runners,
  project,
  settings,
  user,
  members,
}: any) {
  const [targetRunner, setTargetRunner] = React.useState({} as any);
  const showRunnerDrawer = useDisclosure();
  const addRunnerModal = useDisclosure();
  const deleteRunnerModal = useDisclosure();

  const isMobile = useMediaQuery("(max-width: 650px)");

  const copyRunnerIDtoClipboard = (id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      toast.success("Runner ID copied to clipboard!");
    } else {
      toast.error("Failed to copy runner ID to clipboard");
    }
  };

  function heartbeatColor(runner: any) {
    const timeAgo =
      (new Date(runner.last_heartbeat).getTime() - Date.now()) / 1000;

    if (timeAgo < 0 && timeAgo > -30) {
      return "success";
    } else if (timeAgo <= -30 && timeAgo > -60) {
      return "warning";
    } else if (timeAgo <= -60) {
      return "danger";
    }
  }

  function heartbeatStatus(runner: any) {
    const timeAgo =
      (new Date(runner.last_heartbeat).getTime() - Date.now()) / 1000;

    if (timeAgo < 0 && timeAgo > -30) {
      return true;
    } else if (timeAgo <= -30) {
      return false;
    }
  }

  function checkQuotaDisabled() {
    if (!settings.create_runners) {
      return true;
    } else if (project.disabled) {
      return true;
    } else if (user.role === "vip") {
      return false;
    } else if (user.role === "admin") {
      return false;
    } else if (
      members.find((m: any) => m.user_id === user.id) &&
      members.filter((m: any) => m.user_id === user.id)[0].role === "Viewer"
    ) {
      return true;
    }

    return false;
  }

  return (
    <main>
      <ProjectRunnerDetails project={project} />
      <Spacer y={4} />
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Your Runners</p>
      </div>
      <Divider className="mb-4" />
      <div className="flex flex-col gap-4">
        {runners.map(
          (runner: any) =>
            runner.alertflow_runner === false && (
              <Card
                key={runner.id}
                isPressable
                onPress={() => {
                  setTargetRunner(runner);
                  showRunnerDrawer.onOpen();
                }}
              >
                <CardHeader className="items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <p className="text-md font-bold">{runner.name}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip
                        color={runner.disabled ? "danger" : "success"}
                        radius="sm"
                        size="sm"
                        variant="flat"
                      >
                        {runner.disabled ? "Disabled" : "Enabled"}
                      </Chip>
                      <Chip
                        color={heartbeatColor(runner)}
                        radius="sm"
                        size="sm"
                        variant="flat"
                      >
                        {heartbeatStatus(runner) ? "Healthy" : "Unhealthy"}
                      </Chip>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-end gap-2">
                    <Dropdown backdrop="opaque">
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <VerticalDotsIcon
                            className="text-default-300"
                            height={undefined}
                            width={undefined}
                          />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownSection title="Actions">
                          <DropdownItem
                            key="copy"
                            startContent={
                              <Icon icon="solar:copy-outline" width={18} />
                            }
                            onPress={() => copyRunnerIDtoClipboard(runner.id)}
                          >
                            Copy ID
                          </DropdownItem>
                        </DropdownSection>
                        <DropdownSection title="Danger zone">
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            isDisabled={
                              members.find((m: any) => m.user_id === user.id) &&
                              members.filter(
                                (m: any) => m.user_id === user.id,
                              )[0].role === "Viewer"
                            }
                            startContent={
                              <Icon
                                icon="solar:trash-bin-trash-outline"
                                width={18}
                              />
                            }
                            onPress={() => {
                              setTargetRunner(runner);
                              deleteRunnerModal.onOpen();
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownSection>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </CardHeader>
                <CardBody className="flex flex-col">
                  {runner.disabled && (
                    <p className="mb-4 text-center text-lg font-bold text-danger">
                      {runner.disabled_reason}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center justify-center text-center">
                    <Spinner label="Waiting for connection..." size="md" />
                  </div>
                </CardBody>
              </Card>
            ),
        )}
      </div>

      <Spacer y={4} />
      <p className="text-lg font-bold">AlertFlow Runners</p>
      <Divider className="mb-4" />
      {project.alertflow_runners === true && (
        <div>
          <div className="grid gap-4 lg:grid-cols-2">
            {runners.map(
              (runner: any) =>
                runner.alertflow_runner === true && (
                  <Card key={runner.id}>
                    <CardHeader className="items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                          <p className="text-md">{runner.name}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Chip
                              color={runner.disabled ? "danger" : "success"}
                              radius="sm"
                              size="sm"
                              variant="flat"
                            >
                              {runner.disabled ? "Disabled" : "Enabled"}
                            </Chip>
                            <Chip
                              color={heartbeatColor(runner)}
                              radius="sm"
                              size="sm"
                              variant="flat"
                            >
                              {heartbeatStatus(runner)
                                ? "Healthy"
                                : "Unhealthy"}
                            </Chip>
                          </div>
                        </div>
                        <p className="text-sm text-default-500">{runner.id}</p>
                      </div>
                      <div className="relative flex items-center justify-end gap-2">
                        <Dropdown backdrop="opaque">
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <VerticalDotsIcon
                                className="text-default-300"
                                height={undefined}
                                width={undefined}
                              />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownSection title="Actions">
                              <DropdownItem
                                key="copy"
                                startContent={
                                  <Icon icon="solar:copy-outline" width={18} />
                                }
                                onPress={() =>
                                  copyRunnerIDtoClipboard(runner.id)
                                }
                              >
                                Copy ID
                              </DropdownItem>
                            </DropdownSection>
                            <DropdownSection title="Danger zone">
                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                isDisabled={
                                  members.find(
                                    (m: any) => m.user_id === user.id,
                                  ) &&
                                  members.filter(
                                    (m: any) => m.user_id === user.id,
                                  )[0].role === "Viewer"
                                }
                                startContent={
                                  <Icon
                                    icon="solar:trash-bin-trash-outline"
                                    width={18}
                                  />
                                }
                                onPress={() => {
                                  setTargetRunner(runner);
                                  deleteRunnerModal.onOpen();
                                }}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownSection>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="flex flex-col">
                      {runner.disabled && (
                        <p className="mb-4 text-center text-lg font-bold text-danger">
                          {runner.disabled_reason}
                        </p>
                      )}
                      <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="flex size-10 items-center justify-center rounded-small bg-primary/10 text-primary">
                            <Icon icon="solar:heart-pulse-outline" width={20} />
                          </div>
                          <div>
                            <p
                              className={`text-md text-${heartbeatColor(runner)} font-bold`}
                            >
                              {runner.last_heartbeat !==
                                "0001-01-01T00:00:00Z" && (
                                <TimeAgo date={runner.last_heartbeat} />
                              )}
                              {runner.last_heartbeat ===
                                "0001-01-01T00:00:00Z" && "N/A"}
                            </p>
                            <p className="text-sm text-default-500">
                              Last Heartbeat
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="flex size-10 items-center justify-center rounded-small bg-primary/10 text-primary">
                            <Icon
                              icon="solar:gamepad-minimalistic-outline"
                              width={20}
                            />
                          </div>
                          <div>
                            <p
                              className={`text-md font-bold ${runner.executing_job && "text-success"}`}
                            >
                              {runner.executing_job ? "Executing Job" : "Idle"}
                            </p>
                            <p className="text-sm text-default-500">Status</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="flex size-10 items-center justify-center rounded-small bg-primary/10 text-primary">
                            <Icon icon="solar:sd-card-outline" width={20} />
                          </div>
                          <div>
                            <p className="text-md font-bold">
                              {runner.runner_version
                                ? runner.runner_version
                                : "N/A"}
                            </p>
                            <p className="text-sm text-default-500">Version</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ),
            )}
          </div>
        </div>
      )}
      {project.alertflow_runners === false && (
        <div>
          <p className="my-4 text-sm font-bold text-default-500">
            AlertFlow runners are disabled
          </p>
        </div>
      )}
      <RunnerDrawer disclosure={showRunnerDrawer} runner={targetRunner} />
      <CreateRunnerModal
        alertflow_runner={false}
        disclosure={addRunnerModal}
        project={project}
      />
      <DeleteRunnerModal disclosure={deleteRunnerModal} runner={targetRunner} />
    </main>
  );
}
