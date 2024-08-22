"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import FunctionShowPayloadModal from "@/components/functions/flows/showPayload";
import FunctionDeletePayloadModal from "@/components/functions/flows/deletePayload";

export function PayloadsList({ flows, payloads, executions, runners }: any) {
  const router = useRouter();

  const showPayloadModal = useDisclosure();
  const deletePayloadModal = useDisclosure();
  const [targetFlow, setTargetFlow] = React.useState({} as any);
  const [targetPayload, setTargetPayload] = React.useState({} as any);

  const handleShow = (payload: any) => {
    setTargetPayload(payload);
    showPayloadModal.onOpen();
  };

  const handleDelete = (payload: any, flow: any) => {
    setTargetPayload(payload);
    setTargetFlow(flow);
    deletePayloadModal.onOpen();
  };

  // pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 7;
  const pages = Math.ceil(payloads.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return payloads.slice(start, end);
  }, [page, payloads]);

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const renderCell = React.useCallback((payload: any, columnKey: any) => {
    const cellValue = payload[columnKey];

    switch (columnKey) {
      case "id":
        return <p className="text-sm text-default-500">{payload.id}</p>;
      case "flow_id":
        return (
          <div>
            <p>{flows.find((f: any) => f.id === payload.flow_id)?.name}</p>
            <p className="text-xs text-default-400">{payload.flow_id}</p>
          </div>
        );
      case "runner_id":
        return (
          <div>
            <p>{runners.find((r: any) => r.id === payload.runner_id)?.name}</p>
            <p className="text-xs text-default-400">{payload.runner_id}</p>
          </div>
        );
      case "execution_id":
        return (
          <div>
            <p className="text-sm text-default-500">
              {executions.find((e: any) => e.payload_id === payload.id)?.id ||
                "No Execution found"}
            </p>
          </div>
        );
      case "created_at":
        return new Date(payload.created_at).toLocaleString("de-DE");
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icon
                    className="text-default-400"
                    icon="solar:menu-dots-broken"
                    width={24}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded">
                <DropdownSection showDivider title="View">
                  <DropdownItem
                    key="view_payload"
                    color="primary"
                    startContent={
                      <Icon icon="solar:letter-opened-broken" width={20} />
                    }
                    onClick={() => handleShow(payload)}
                  >
                    Payload
                  </DropdownItem>
                  <DropdownItem
                    key="view_execution"
                    color="primary"
                    isDisabled={
                      !executions.find((e: any) => e.payload_id === payload.id)
                    }
                    startContent={
                      <Icon icon="solar:reorder-line-duotone" width={20} />
                    }
                    onClick={() =>
                      router.push(
                        `/dashboard/flows/${payload.flow_id}/execution/${executions.find((e: any) => e.payload_id === payload.id)?.id}`,
                      )
                    }
                  >
                    Execution
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger Zone">
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    startContent={
                      <Icon icon="solar:trash-bin-2-broken" width={20} />
                    }
                    onClick={() => handleDelete(payload, payload.flow_id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <p className="text-2xl font-bold mb-0 text-danger">Admin</p>
          <p className="text-2xl mb-0">|</p>
          <p className="text-2xl mb-0">Payloads</p>
        </div>
      </div>
      <Divider className="my-4" />
      <div>
        <Table
          aria-label="Example table with custom cells"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                showShadow
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="id" align="start">
              ID
            </TableColumn>
            <TableColumn key="flow_id" align="start">
              Flow
            </TableColumn>
            <TableColumn key="runner_id" align="start">
              Runner
            </TableColumn>
            <TableColumn key="execution_id" align="start">
              Execution
            </TableColumn>
            <TableColumn key="created_at" align="start">
              Created At
            </TableColumn>
            <TableColumn key="actions" align="center">
              Actions
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."} items={items}>
            {(item: any) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <FunctionShowPayloadModal
        disclosure={showPayloadModal}
        payload={targetPayload}
      />
      <FunctionDeletePayloadModal
        disclosure={deletePayloadModal}
        flow={targetFlow}
        payload={targetPayload}
      />
    </main>
  );
}
