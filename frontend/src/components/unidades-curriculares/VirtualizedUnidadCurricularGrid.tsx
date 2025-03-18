import type { ComponentPropsWithoutRef } from "react";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import type { FixedSizeGridProps } from "react-window";
import { FixedSizeGrid as OriginalFixedSizeGrid } from "react-window";

import type { UnidadCurricular } from "@/models";
import { cn } from "@/utils";
import { MemoizedUnidadCurricularItem } from "./UnidadCurricularItem";

const FixedSizeGrid = OriginalFixedSizeGrid as unknown as React.ComponentType<
  FixedSizeGridProps<any> // eslint-disable-line @typescript-eslint/no-explicit-any
>;

type VirtualizedUnidadCurricularGridProps = ComponentPropsWithoutRef<"div"> & {
  unidadesCurriculares: UnidadCurricular[];
  titulo?: string;
};

const VirtualizedUnidadCurricularGrid = ({
  unidadesCurriculares,
  titulo,
  className,
  ...props
}: VirtualizedUnidadCurricularGridProps) => {
  return (
    <div
      className={cn("w-full h-full flex flex-col gap-4", className)}
      {...props}
    >
      {titulo && <h2 className="text-lg font-medium">{titulo}</h2>}

      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeGrid
            height={height}
            width={width}
            columnCount={3}
            columnWidth={width / 3}
            rowCount={Math.ceil(unidadesCurriculares.length / 3)}
            rowHeight={30}
          >
            {({ columnIndex, rowIndex, style }) => {
              const index = rowIndex * 3 + columnIndex;
              const unidadCurricular = unidadesCurriculares[index];

              if (!unidadCurricular) return null;

              return (
                <div style={style}>
                  <MemoizedUnidadCurricularItem
                    unidadCurricular={unidadCurricular}
                  />
                </div>
              );
            }}
          </FixedSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
};

export const MemoizedVirtualizedUnidadCurricularGrid = React.memo(
  VirtualizedUnidadCurricularGrid,
);
