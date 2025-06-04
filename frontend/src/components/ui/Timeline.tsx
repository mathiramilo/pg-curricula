import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const timelineVariants = tv({
  slots: {
    root: "flex flex-col w-full",
    item: "flex gap-8 relative",
    separator: "absolute left-2 top-0 w-[2px] h-full bg-slate-200",
    content: "flex flex-col gap-1 p-2 ml-6",
    title: "text-sm font-semibold text-fuente-principal",
    description: "text-xs text-fuente-secundario",
    dot: "absolute left-[3px] z-10 top-3 size-3 bg-slate-900 rounded-full",
  },
});

const { root, item, separator, content, title, description, dot } =
  timelineVariants();

const Timeline = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={root({ className })} {...props} />
  ),
);
Timeline.displayName = "Timeline";

const TimelineItem = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={item({ className })} {...props} />
));
TimelineItem.displayName = "TimelineItem";

const TimelineSeparator = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={separator({ className })} {...props} />
));
TimelineSeparator.displayName = "TimelineSeparator";

const TimelineContent = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={content({ className })} {...props} />
));
TimelineContent.displayName = "TimelineContent";

const TimelineTitle = forwardRef<
  ElementRef<"h3">,
  ComponentPropsWithoutRef<"h3">
>(({ children, className, ...props }, ref) => (
  <h3 ref={ref} className={title({ className })} {...props}>
    {children}
  </h3>
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineDescription = forwardRef<
  ElementRef<"p">,
  ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p ref={ref} className={description({ className })} {...props} />
));
TimelineDescription.displayName = "TimelineDescription";

const TimelineDot = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={dot({ className })} {...props} />
));
TimelineDot.displayName = "TimelineDot";

export {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineDot,
};
