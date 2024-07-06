/* eslint-disable no-undef */
"use client";
import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

export default function SignUp({ settings }: any) {
  const router = useRouter();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Card isBlurred>
          <CardHeader className="flex flex-col items-start justify-start">
            <div className="flex items-center justify-center">
              <p className="text-2xl font-bold">SignUp to&nbsp;</p>
              <p className="text-2xl font-bold text-primary">AlertFlow</p>
            </div>
            <p className="text-sm text-default-500">
              {" "}
              Enter your informations to create an account.
            </p>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4">
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                isRequired
                label="Username"
                size="sm"
                type="username"
                variant="flat"
              />
              <Input
                isRequired
                label="Email"
                size="sm"
                type="email"
                variant="flat"
              />
            </div>
            <Input
              isRequired
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Password"
              size="sm"
              type={isVisible ? "text" : "password"}
              variant="flat"
            />
          </CardBody>
          <CardFooter className="flex flex-col gap-2">
            <Button
              fullWidth
              color="primary"
              isDisabled={!settings.signup}
              size="md"
              variant="flat"
            >
              Create an account
            </Button>
            <p className="text-sm text-default-500">
              Already have an account?{" "}
              <Link color="secondary" href="/" size="sm">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
