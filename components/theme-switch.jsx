/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { useSwitch } from "@heroui/react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import clsx from "clsx";

import { Moon, Sun } from "lucide-react";

export const ThemeSwitch = ({ className, classNames }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    resolvedTheme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: isSSR ? false : resolvedTheme === "light",
    "aria-label": `Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "size-11",
              "bg-transparent",
              "rounded-xl",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR ? (
          <Sun className="size-5" strokeWidth={1.8} />
        ) : (
          <Moon className="size-5" strokeWidth={1.8} />
        )}
      </div>
    </Component>
  );
};
