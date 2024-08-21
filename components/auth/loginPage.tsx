"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Checkbox,
  Link,
  Image,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { useRouter } from "next/navigation";

import LoginAPI from "@/lib/auth/login";
import { setSession } from "@/lib/setSession";
import { IconWrapper } from "@/lib/IconWrapper";

import { InfoIcon, MailIcon } from "../icons";
import Particles from "../magicui/particles";

export default function LoginPageComponent() {
  const { theme } = useTheme();
  const isSSR = useIsSSR();
  const router = useRouter();

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  async function onLogin() {
    setIsLoginLoading(true);
    setError(false);
    setErrorText("");

    const res = await LoginAPI(email, password);

    if (!res.error) {
      await setSession(res.token, res.user, res.expires_at);
      router.push("/dashboard");
      setIsLoginLoading(false);
    } else {
      setIsLoginLoading(false);
      setError(true);
      setErrorText(res.error);
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <Particles
        refresh
        className="absolute inset-0"
        color={theme === "light" ? "#000" : "#fff"}
        ease={80}
        quantity={100}
      />
      <div className="flex flex-col items-center pb-2">
        <Image
          alt="Logo"
          height={32}
          radius="none"
          shadow="none"
          src={`/images/af_logo_${theme === "light" || isSSR ? "black" : "white"}.png`}
          width={32}
        />
        <p className="text-xl font-medium">Welcome Back</p>
        <p className="text-small text-default-500">
          Log in to your account to continue
        </p>
      </div>
      <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        {error && (
          <Card className="border border-danger-300 border-2">
            <CardHeader className="justify-start gap-2 items-center">
              <IconWrapper className="bg-danger/10 text-danger">
                <InfoIcon className="text-lg" />
              </IconWrapper>
              <p className="text-md font-bold text-danger capitalize">
                {errorText}
              </p>
            </CardHeader>
          </Card>
        )}
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            required
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            variant="bordered"
            onValueChange={setEmail}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            value={password}
            variant="bordered"
            onValueChange={setPassword}
          />
          <div className="flex items-center justify-between px-1 py-2">
            <Checkbox
              isSelected={rememberMe}
              name="remember"
              size="sm"
              onValueChange={setRememberMe}
            >
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button
            color="primary"
            isLoading={isLoginLoading}
            type="submit"
            onPress={onLogin}
          >
            Login
          </Button>
        </form>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/auth/signup" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}