"use client";
import { Icon } from "@iconify/react";
import { Tab, Tabs } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Flash } from "@/components/icons";

import Actions from "./actions";
import Executions from "./executions";
import Payloads from "./payloads";
import FlowStats from "./stats";
import FlowEncryption from "./encryption";

export default function FlowTabs({
  flow,
  executions,
  payloads,
  runners,
  user,
  canEdit,
}: any) {
  const [selected, setSelected] = React.useState("actions");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  React.useEffect(() => {
    const tab = params.get("tab") || "actions";

    setSelected(tab);
  }, [params]);

  const handleTabChange = (key: any) => {
    params.set("tab", key);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <main>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          color="primary"
          selectedKey={selected}
          variant="solid"
          onSelectionChange={handleTabChange}
        >
          <Tab
            key="actions"
            title={
              <div className="flex items-center space-x-2">
                <Flash fill="currentColor" size={20} />
                <span>Actions</span>
              </div>
            }
          >
            <Actions
              canEdit={canEdit}
              flow={flow}
              runners={runners}
              user={user}
            />
          </Tab>
          <Tab
            key="executions"
            title={
              <div className="flex items-center space-x-2">
                <Icon height={20} icon="solar:reorder-linear" width="20" />
                <span>Executions</span>
              </div>
            }
          >
            <Executions
              canEdit={canEdit}
              executions={executions}
              payloads={payloads}
            />
          </Tab>
          <Tab
            key="payloads"
            title={
              <div className="flex items-center space-x-2">
                <Icon
                  height="20"
                  icon="solar:letter-opened-outline"
                  width="20"
                />
                <span>Payloads</span>
              </div>
            }
          >
            <Payloads
              canEdit={canEdit}
              executions={executions}
              flow={flow}
              payloads={payloads}
              runners={runners}
            />
          </Tab>
          <Tab
            key="encryption"
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="solar:lock-linear" width={20} />
                <span>Encryption</span>
              </div>
            }
          >
            <FlowEncryption flow={flow} />
          </Tab>
          <Tab
            key="stats"
            title={
              <div className="flex items-center space-x-2">
                <Icon height="20" icon="solar:chart-2-outline" width="20" />
                <span>Stats</span>
              </div>
            }
          >
            <FlowStats flowID={flow.id} />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
