import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    value={value}
    {...props}
  >
    <SliderPrimitive.Track className="bg-slate-200 relative h-2 w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="absolute h-full bg-slate-600" />
    </SliderPrimitive.Track>
    {value?.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="bg-white cursor-pointer focus-visible:ring-slate-300 block h-5 w-5 rounded-full border-2 border-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
