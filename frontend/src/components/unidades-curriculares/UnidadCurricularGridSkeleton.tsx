import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/utils";
import { Skeleton } from "../ui";
import { UnidadCurricularItemSkeleton } from "./UnidadCurricularItemSkeleton";

type UnidadCurricularGridSkeletonProps = ComponentPropsWithoutRef<"div"> & {
  itemsAmount?: number;
};

export const UnidadCurricularGridSkeleton = ({
  itemsAmount = 42,
  className,
  ...props
}: UnidadCurricularGridSkeletonProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-6", className)} {...props}>
      <Skeleton className="w-48 h-6 rounded-full" />
      <div className="w-full grid lg:grid-cols-3 gap-x-12 gap-y-2">
        {Array.from({ length: itemsAmount }).map((_, index) => (
          <UnidadCurricularItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
