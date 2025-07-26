import * as React from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

const alertVariants = tv({
  slots: {
    root: "relative flex w-full rounded-lg border px-4 py-3 text-sm items-start",
    content: "flex flex-col gap-1",
    title: "font-medium tracking-tight",
    description: "gap-1 text-sm",
  },
  variants: {
    variant: {
      default: {
        root: "bg-slate-100 border-slate-200",
        title: "text-fuente-principal",
        description: "text-fuente-secundario",
      },
      destructive: {
        root: "bg-red-50 text-red-500 border-red-200",
        title: "text-red-500",
        description: "text-red-400",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const AlertVariantsContext = React.createContext<
  VariantProps<typeof alertVariants>
>({
  variant: "default",
});
const useAlertVariants = () => {
  const { variant } = React.useContext(AlertVariantsContext);
  return alertVariants({ variant });
};

const Alert = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  const { root } = useAlertVariants();

  return (
    <AlertVariantsContext.Provider value={{ variant }}>
      <div
        ref={ref}
        role="alert"
        className={root({ variant, className })}
        {...props}
      />
    </AlertVariantsContext.Provider>
  );
});
Alert.displayName = "Alert";

const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { content } = useAlertVariants();
  return <div ref={ref} className={content({ className })} {...props} />;
});
AlertContent.displayName = "AlertContent";

const AlertTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { title } = useAlertVariants();
  return <div ref={ref} className={title({ className })} {...props} />;
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { description } = useAlertVariants();
  return <div ref={ref} className={description({ className })} {...props} />;
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertContent, AlertTitle, AlertDescription };
