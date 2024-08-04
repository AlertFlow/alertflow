"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Divider,
  Snippet,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  cn,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";

import {
  DeleteDocumentIcon,
  EditDocumentIcon,
  LockIcon,
  PlusIcon,
  VerticalDotsIcon,
} from "@/components/icons";
import CreateTokenModal from "@/components/functions/tokens/create";
import DeleteTokenModal from "@/components/functions/tokens/delete";
import ChangeTokenStatusModal from "@/components/functions/tokens/changeStatus";
import EditTokenModal from "@/components/functions/tokens/edit";

export function TokensList({ tokens, projects }: any) {
  const [status, setStatus] = React.useState(false);
  const [targetToken, setTargetToken] = React.useState({} as any);
  const addTokenModal = useDisclosure();
  const changeStatusModal = useDisclosure();
  const editModal = useDisclosure();
  const deleteTokenModal = useDisclosure();

  // pagination
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 7;
  const pages = Math.ceil(tokens.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tokens.slice(start, end);
  }, [page, tokens]);

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const renderCell = React.useCallback((token: any, columnKey: any) => {
    const cellValue = token[columnKey];

    switch (columnKey) {
      case "project_id":
        return (
          <div>
            {token.project_id !== "none" && (
              <span>
                <p>
                  {projects.find((p: any) => p.id === token.project_id)?.name ||
                    "Unknown"}
                </p>
                <p className="text-sm text-default-400">{token.project_id}</p>
              </span>
            )}
            {token.project_id === "none" && (
              <span>
                <p>None</p>
                <p className="text-sm text-default-400">
                  Probaply an Token for anything Alertflow related
                </p>
              </span>
            )}
          </div>
        );
      case "description":
        return <p className="text-sm text-default-500">{token.description}</p>;
      case "status":
        return (
          <div>
            <Chip
              className="capitalize"
              color={token.disabled ? "danger" : "success"}
              radius="sm"
              size="sm"
              variant="flat"
            >
              {token.disabled ? "Disabled" : "Active"}
            </Chip>
            {token.disabled && (
              <p className="text-sm text-default-400">
                {token.disabled_reason}
              </p>
            )}
          </div>
        );
      case "created_at":
        return new Date(token.created_at).toLocaleString("de-DE");
      case "key":
        return (
          <Snippet hideSymbol className="w-full" codeString={token.key}>
            <span>{token.key.slice(0, 15) + "..."}</span>
          </Snippet>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded">
                <DropdownSection title="Edit Zone">
                  <DropdownItem
                    key="edit"
                    className="text-warning"
                    color="warning"
                    description="Apply changes to this token"
                    startContent={
                      <EditDocumentIcon
                        className={cn(iconClasses, "text-warning")}
                      />
                    }
                    onClick={() => {
                      setTargetToken(token);
                      editModal.onOpen();
                    }}
                  >
                    Edit
                  </DropdownItem>
                  {token.disabled ? (
                    <DropdownItem
                      key="disable"
                      className="text-success"
                      color="success"
                      description="Enable this token"
                      startContent={
                        <LockIcon className={cn(iconClasses, "text-success")} />
                      }
                      onClick={() => {
                        setTargetToken(token);
                        setStatus(false);
                        changeStatusModal.onOpen();
                      }}
                    >
                      Enable
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key="disable"
                      className="text-danger"
                      color="danger"
                      description="Disable this token"
                      startContent={
                        <LockIcon className={cn(iconClasses, "text-danger")} />
                      }
                      onClick={() => {
                        setTargetToken(token);
                        setStatus(true);
                        changeStatusModal.onOpen();
                      }}
                    >
                      Disable
                    </DropdownItem>
                  )}
                </DropdownSection>
                <DropdownSection title="Danger Zone">
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    description="Permanently delete this token"
                    startContent={
                      <DeleteDocumentIcon
                        className={cn(iconClasses, "text-danger")}
                      />
                    }
                    onClick={() => {
                      setTargetToken(token);
                      deleteTokenModal.onOpen();
                    }}
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
          <p className="text-2xl mb-0">Tokens</p>
        </div>
        <Button
          color="primary"
          startContent={<PlusIcon height={undefined} width={undefined} />}
          variant="flat"
          onPress={() => addTokenModal.onOpen()}
        >
          Add New
        </Button>
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
            <TableColumn key="project_id" align="start">
              PROJECT
            </TableColumn>
            <TableColumn key="id" align="start">
              ID
            </TableColumn>
            <TableColumn key="description" align="start">
              DESCRIPTION
            </TableColumn>
            <TableColumn key="key" align="start">
              KEY
            </TableColumn>
            <TableColumn key="status" align="start">
              STATUS
            </TableColumn>
            <TableColumn key="created_at" align="start">
              CREATED AT
            </TableColumn>
            <TableColumn key="actions" align="center">
              ACTIONS
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
      <CreateTokenModal disclosure={addTokenModal} projectID={"none"} />
      <ChangeTokenStatusModal
        disclosure={changeStatusModal}
        status={status}
        token={targetToken}
      />
      <EditTokenModal disclosure={editModal} token={targetToken} />
      <DeleteTokenModal disclosure={deleteTokenModal} token={targetToken} />
    </main>
  );
}