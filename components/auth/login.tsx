/* eslint-disable no-undef */
"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Avatar,
  User,
  Card,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import { LogInIcon, UserPlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Logout } from "@/lib/logout";
import {
  MailIcon,
  LockIcon,
  InfoIcon,
  CopyDocumentIcon,
} from "@/components/icons";
import { setSession } from "@/lib/setSession";
import { IconWrapper } from "@/lib/IconWrapper";

export default function Login({ user, session, showSignUp, settings }: any) {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const userData = user;

  async function onLogin() {
    setIsLoginLoading(true);
    setError(false);
    setErrorText("");

    const emailInput = document.getElementsByName(
      "email",
    )[0] as HTMLInputElement;
    const email = emailInput.value;

    const passwordInput = document.getElementsByName(
      "password",
    )[0] as HTMLInputElement;
    const password = passwordInput.value;

    const response = await fetch(process.env.API_ENDPOINT + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response) return;

    const { token, user, expires_at } = await response.json();

    setSession(token, user, expires_at);

    if (token) {
      setError(false);
      setErrorText("");
      setIsLoginLoading(false);
      onOpenChange();
    } else {
      setIsLoginLoading(false);
      setError(true);
      setErrorText("Invalid credentials");
    }
  }

  async function LogoutHandler() {
    await Logout();
  }

  return (
    <>
      {userData?.username && (
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={userData?.username}
              radius="sm"
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dropdown menu with description"
            variant="faded"
          >
            <DropdownItem key="user" showDivider>
              <User
                avatarProps={{
                  size: "sm",
                  radius: "sm",
                  name: userData?.username,
                }}
                classNames={{
                  name:
                    userData?.role === "Admin" ? "text-danger font-bold" : "",
                }}
                description={userData?.email}
                name={
                  userData?.role === "Admin"
                    ? userData?.username + " | " + userData?.role
                    : userData?.username
                }
              />
            </DropdownItem>
            <DropdownItem key="profile">Profile</DropdownItem>
            <DropdownItem
              key="api_key"
              showDivider
              startContent={<CopyDocumentIcon />}
              onPress={() => {
                navigator.clipboard.writeText(session);
              }}
            >
              Copy API Key
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              onPress={LogoutHandler}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      {!userData?.username && (
        <>
          <div className="flex gap-2">
            <Button
              color="primary"
              startContent={<LogInIcon />}
              variant="flat"
              onPress={onOpen}
            >
              Login
            </Button>
            {showSignUp && settings.signup && (
              <Button
                color="secondary"
                startContent={<UserPlusIcon />}
                variant="flat"
                onPress={() => router.push("/auth/signup")}
              >
                Sign Up
              </Button>
            )}
            {showSignUp && !settings.signup && (
              <Tooltip
                color="default"
                content={
                  <div className="px-1 py-2">
                    <div className="text-small font-bold text-danger">
                      Disabled
                    </div>
                    <div className="text-tiny">
                      Sign Up is currently disabled
                    </div>
                  </div>
                }
                offset={15}
                placement="bottom"
              >
                <span>
                  <Button
                    isDisabled
                    color="secondary"
                    startContent={<UserPlusIcon />}
                    variant="flat"
                  >
                    Sign Up
                  </Button>
                </span>
              </Tooltip>
            )}
          </div>
          <Modal
            isDismissable={false}
            isOpen={isOpen}
            placement="center"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose: any) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Log in
                  </ModalHeader>
                  <ModalBody>
                    {error && (
                      <Card className="border border-danger-300 border-2">
                        <CardHeader className="justify-start gap-2 items-center">
                          <IconWrapper className="bg-danger/10 text-danger">
                            <InfoIcon className="text-lg" />
                          </IconWrapper>
                          <p className="text-md font-bold text-danger">
                            {errorText}
                          </p>
                        </CardHeader>
                      </Card>
                    )}
                    <Input
                      required
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      variant="bordered"
                    />
                    <Input
                      required
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Remember me
                      </Checkbox>
                      <Link color="primary" href="#" size="sm">
                        Forgot password?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      isLoading={isLoginLoading}
                      onPress={onLogin}
                    >
                      Sign in
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}