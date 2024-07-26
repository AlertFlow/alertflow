import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import TimeAgo from "react-timeago";
import { useRouter } from "next/navigation";
import React from "react";

import { IconWrapper } from "@/lib/IconWrapper";

export default function Executions({ flow, executions }: any) {
  const router = useRouter();

  // pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(executions.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return executions.slice(start, end);
  }, [page, executions]);

  function status(execution: any) {
    if (execution.running) {
      return "Running";
    } else if (execution.waiting) {
      return "Waiting";
    } else if (execution.paused) {
      return "Paused";
    } else if (execution.error) {
      return "Error";
    } else if (execution.no_match) {
      return "No Match";
    } else {
      return "Finished";
    }
  }

  function statusColor(execution: any) {
    if (execution.running) {
      return "primary";
    } else if (execution.waiting) {
      return "warning";
    } else if (execution.paused) {
      return "warning";
    } else if (execution.error) {
      return "danger";
    } else if (execution.no_match) {
      return "secondary";
    } else {
      return "success";
    }
  }

  function statusIcon(execution: any) {
    if (execution.running) {
      return <Spinner color="primary" size="sm" />;
    } else if (execution.waiting) {
      return <Icon icon="solar:pause-broken" />;
    } else if (execution.paused) {
      return <CircularProgress color="warning" size="sm" value={100} />;
    } else if (execution.error) {
      return <CircularProgress color="danger" size="sm" value={100} />;
    } else if (execution.no_match) {
      return <CircularProgress color="secondary" size="sm" value={100} />;
    } else {
      return <CircularProgress color="success" size="sm" value={100} />;
    }
  }

  return (
    <main className="grid lg:grid-cols-1 gap-4">
      {items.map((execution: any) => (
        <Card key={execution.id} fullWidth>
          <CardHeader className="justify-between">
            <div className="flex justify-start items-center gap-4">
              <IconWrapper
                className={`bg-${statusColor(execution)}/10 text-${statusColor(execution)}`}
              >
                {statusIcon(execution)}
              </IconWrapper>
              <p className="text-md font-bold">{execution.id}</p>

              <Chip
                color={statusColor(execution)}
                radius="sm"
                size="sm"
                variant="flat"
              >
                {status(execution)}
              </Chip>
            </div>
            <Chip color="default" radius="sm" variant="light">
              <TimeAgo date={new Date(execution.created_at)} />
            </Chip>
          </CardHeader>
          <CardBody className="grid gap-2">
            <div className="flex justify-between items-center">
              <div className="grid grid-cols-3 w-full gap-2">
                <div>
                  <p className="text-sm text-default-500">Created At</p>
                  <p className="text-sm text-default-500">
                    {new Date(execution.created_at).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-default-500">Executed At</p>
                  <p className="text-sm text-default-500">
                    {new Date(execution.executed_at).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-default-500">Finished At</p>
                  <p className="text-sm text-default-500">
                    {new Date(execution.finished_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-4 h-full">
                <Divider orientation="vertical" />
                <Button
                  fullWidth
                  color="primary"
                  size="md"
                  startContent={<Icon icon="solar:eye-broken" />}
                  variant="flat"
                  onPress={() =>
                    router.push(
                      `/dashboard/flows/${flow.id}/execution/${execution.id}`,
                    )
                  }
                >
                  View
                </Button>
                <Button
                  fullWidth
                  isIconOnly
                  color="danger"
                  size="md"
                  variant="flat"
                >
                  <Icon
                    height="20"
                    icon="solar:trash-bin-minimalistic-broken"
                    width="20"
                  />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
      <div className="flex justify-center">
        <Pagination
          showControls
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </main>
  );
}