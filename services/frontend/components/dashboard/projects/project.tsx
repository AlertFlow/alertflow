"use client";

import { Icon } from "@iconify/react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  useDisclosure,
} from "@heroui/react";
import NumberFlow from "@number-flow/react";
import React from "react";

import Reloader from "@/components/reloader/Reloader";
import { subtitle } from "@/components/primitives";
import EditProjectModal from "@/components/functions/projects/edit";

import ProjectBreadcrumbs from "./project/breadcrumbs";
import ProjectTabs from "./project/tabs";

export default function Project({
  user,
  settings,
  project,
  members,
  runners,
  tokens,
  audit,
  flows,
}: any) {
  const editProjectModal = useDisclosure();

  function checkEditDisabled() {
    if (project.disabled) {
      return true;
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
      <div className="grid items-center justify-between lg:grid-cols-2">
        <ProjectBreadcrumbs id={project.id} />
        <div className="mt-2 lg:mt-0 lg:justify-self-end">
          <Reloader />
        </div>
      </div>
      <div className="my-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            classNames={{
              base: `text-white`,
            }}
            icon={
              <Icon
                icon={
                  project.icon ? project.icon : "solar:question-square-outline"
                }
                width={24}
              />
            }
            radius="md"
            style={{
              backgroundColor: project.color,
            }}
          />
          <div className="flex flex-col items-start">
            <h1 className={subtitle({ className: "mb-0 font-bold" })}>
              {project.name}
            </h1>
            <p className="text-sm text-default-500">{project.description}</p>
          </div>
        </div>
        <Button
          color="warning"
          isDisabled={checkEditDisabled()}
          startContent={<Icon icon="solar:pen-new-square-outline" width={20} />}
          variant="flat"
          onPress={() => editProjectModal.onOpen()}
        >
          Edit
        </Button>
      </div>
      <Divider className="mb-4" />
      {project.disabled && (
        <div className="mb-4">
          <Alert
            color="danger"
            description={project.disabled_reason}
            title="Project is currently disabled"
            variant="flat"
          />
        </div>
      )}
      <div>
        <div className="grid grid-cols-2 items-stretch gap-4 lg:grid-cols-4">
          <div className="col-span-1">
            <Card fullWidth className="h-full">
              <CardBody>
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-small bg-primary/10 text-primary">
                    <Icon icon="solar:smile-square-outline" width={20} />
                  </div>
                  <div>
                    <p className="text-md font-bold">
                      <NumberFlow
                        locales="en-US" // Intl.NumberFormat locales
                        value={members.length}
                      />
                    </p>
                    <p className="text-sm text-default-500">Members</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="col-span-1">
            <Card fullWidth>
              <CardBody>
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-small bg-primary/10 text-primary">
                    <Icon icon="solar:book-2-outline" width={20} />
                  </div>
                  <div>
                    <p className="text-md font-bold">{flows.length}</p>
                    <p className="text-sm text-default-500">Flows</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="col-span-1">
            <Card fullWidth className="h-full">
              <CardBody>
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-small bg-primary/10 text-primary">
                    <Icon icon="solar:rocket-2-outline" width={20} />
                  </div>
                  <div>
                    <p className="text-md font-bold">
                      {project.alertflow_runners ? (
                        <NumberFlow
                          locales="en-US" // Intl.NumberFormat locales
                          value={runners.length}
                        />
                      ) : (
                        <NumberFlow
                          locales="en-US" // Intl.NumberFormat locales
                          value={
                            runners.filter(
                              (r: any) => r.alertflow_runner === false,
                            ).length
                          }
                        />
                      )}
                    </p>
                    <p className="text-sm text-default-500">Runners</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="col-span-1">
            <Card fullWidth className="h-full">
              <CardBody>
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-small bg-primary/10 text-primary">
                    <Icon icon="solar:key-square-2-outline" width={20} />
                  </div>
                  <div>
                    <p className="text-md font-bold">
                      <NumberFlow
                        locales="en-US" // Intl.NumberFormat locales
                        value={tokens.length}
                      />
                    </p>
                    <p className="text-sm text-default-500">Tokens</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <ProjectTabs
          audit={audit}
          members={members}
          project={project}
          runners={runners}
          settings={settings}
          tokens={tokens}
          user={user}
        />
      </div>
      <EditProjectModal disclosure={editProjectModal} project={project} />
    </main>
  );
}
