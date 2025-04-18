"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-slate-50 group-[.toaster]:text-fuente-principal group-[.toaster]:border-borde group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-fuente-secundario",
          actionButton: "group-[.toast]:bg-principal group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-fuente-principal",
          info: "group-[.toaster]:text-sky-500",
          success: "group-[.toaster]:text-green-500",
          warning: "group-[.toaster]:text-orange-500",
          error: "group-[.toaster]:text-red-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
