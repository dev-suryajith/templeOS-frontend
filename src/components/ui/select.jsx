import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";

import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  CheckIcon,
  ChevronUpIcon,
} from "lucide-react";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  );
}

function SelectTrigger({
  type,
  className,
  children,
  size = "default",
  ...props
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full h-14 items-center justify-between",
        "rounded-2xl border border-[#E8D7BC]",
        "bg-[#FFFCF8]",
        "px-5 pr-4",
        "text-[#4A2108]",
        "text-sm",
        "outline-none",
        "transition-all",
        "hover:border-[#D8891E]",
        "focus-visible:border-[#D8891E]",
        "focus-visible:ring-4 focus-visible:ring-[#FCEFD8]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-placeholder:text-[#B48B67]",
        "[&_svg]:text-[#B96D14]",
        "[&_svg]:size-5",
        className
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon
        render={type=='pooja'?<ChevronDownIcon className="pointer-events-none" />:<ChevronUpIcon className="pointer-events-none" />}
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50 md:mt-20 "
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative z-50",
            "w-(--anchor-width)",
            "max-h-72",
            "overflow-y-auto",
            "rounded-2xl",
            "border border-[#E8D7BC]",
            "bg-[#FFFCF8]",
            "shadow-xl",
            "text-[#4A2108]",
            "origin-(--transform-origin)",
            "duration-150",
            "data-open:animate-in",
            "data-open:fade-in-0",
            "data-open:zoom-in-95",
            "data-closed:animate-out",
            "data-closed:fade-out-0",
            "data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />

          <SelectPrimitive.List className="p-2">
            {children}
          </SelectPrimitive.List>

          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#9A6428]",
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center",
        "rounded-xl",
        "px-4 py-3",
        "text-[#4A2108]",
        "transition-all",
        "outline-none",
        "hover:bg-[#FCEFD8]",
        "data-highlighted:bg-[#FCEFD8]",
        "data-highlighted:text-[#4A2108]",
        "data-disabled:pointer-events-none",
        "data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex w-full items-center justify-between">
        {children}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator
        render={
          <span className="absolute right-4 flex items-center justify-center">
            <CheckIcon className="size-4 text-[#D8891E]" />
          </span>
        }
      />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "my-2 h-px bg-[#F2E3CF]",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "flex w-full items-center justify-center py-2 bg-[#FFFCF8] text-[#B96D14]",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "flex w-full items-center justify-center py-2 bg-[#FFFCF8] text-[#B96D14]",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};