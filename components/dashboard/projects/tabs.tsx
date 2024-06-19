"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

import ProjectMembers from "./UserTable";

import { PlayCircleIcon, UsersIcon, TagIcon } from "@/components/icons";
import ProjectAPIKeys from "./APIKeysTable";

export default function ProjectTabs({ project, runners, apiKeys }: any) {
  console.log(apiKeys);

  return (
    <main>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" color="primary" variant="underlined">
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-5 w-5" />
                <span>Members</span>
              </div>
            }
          >
            <ProjectMembers members={project.members} />
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <PlayCircleIcon className="h-5 w-5" />
                <span>Runners</span>
              </div>
            }
          />
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <TagIcon className="h-5 w-5" />
                <span>API Keys</span>
              </div>
            }
          >
            <ProjectAPIKeys apiKeys={apiKeys} />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
