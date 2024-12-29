"use client";
import { Card, CardBody, Divider, Skeleton, Spacer } from "@nextui-org/react";
import React from "react";

import ProjectBreadcrumbs from "@/components/dashboard/projects/project/breadcrumbs";

export default function loader() {
  return (
    <>
      <div className="grid items-center justify-between lg:grid-cols-2">
        <ProjectBreadcrumbs id="..." />
      </div>
      <div className="my-2 flex items-center gap-2">
        <Skeleton className="w-1/12 rounded-lg">
          <div className="h-12 w-1/12 rounded-lg bg-default-200" />
        </Skeleton>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="w-1/12 rounded-lg">
            <div className="h-3 w-1/12 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/12 rounded-lg">
            <div className="h-3 w-2/12 rounded-lg bg-default-200" />
          </Skeleton>
        </div>
      </div>
      <Divider className="mb-4" />
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((_, i) => (
          <Card key={i} fullWidth>
            <CardBody>
              <div className="flex items-center gap-2">
                <Skeleton className="w-2/12 rounded-lg">
                  <div className="h-12 w-2/12 rounded-lg bg-default-200" />
                </Skeleton>
                <div className="flex w-full flex-col gap-2">
                  <Skeleton className="w-1/12 rounded-lg">
                    <div className="h-3 w-1/12 rounded-lg bg-default-200" />
                  </Skeleton>
                  <Skeleton className="w-2/12 rounded-lg">
                    <div className="h-3 w-2/12 rounded-lg bg-default-200" />
                  </Skeleton>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <Spacer y={6} />
      <Skeleton className="w-2/12 rounded-lg">
        <div className="h-10 w-2/12 rounded-lg bg-default-200" />
      </Skeleton>
      <Spacer y={2} />
      <Card fullWidth>
        <CardBody>
          <Skeleton className="w-5/5 rounded-lg">
            <div className="w-5/5 h-8 rounded-lg bg-default-200" />
          </Skeleton>
        </CardBody>
      </Card>
    </>
  );
}