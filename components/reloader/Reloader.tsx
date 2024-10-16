"use client";

import React from "react";
import { Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Reloader() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 20));
      if (value === 100) {
        clearInterval(interval);
        router.refresh();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <Progress
      aria-label="Reloading..."
      className="lg:w-40 w-32"
      size="sm"
      value={value}
    />
  );
}
