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
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "!bg-slate-50 !text-fuente-principal !border-borde !shadow-lg",
          description: "!text-fuente-secundario",
          actionButton: "!bg-principal !text-white",
          cancelButton: "!bg-slate-100 !text-fuente-principal",
          info: "!text-sky-500",
          success: "!text-green-500",
          warning: "!text-orange-500",
          error: "!text-red-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
