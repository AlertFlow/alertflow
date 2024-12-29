"use client";

import { cn } from "@nextui-org/react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = ({
  ref,
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  ref: React.RefObject<React.ElementRef<typeof PopoverPrimitive.Content>>;
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-[999] w-72 rounded-md border shadow-md outline-none",
        className,
      )}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
);

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };