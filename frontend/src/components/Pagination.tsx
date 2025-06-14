import { ChevronRightIcon } from "lucide-react";

import {
  Button,
  ChevronLeftIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  previous: () => void;
  next: () => void;
  previousLabel?: string;
  nextLabel?: string;
}

export const Pagination = ({
  page,
  pageSize,
  totalItems,
  previous,
  next,
  previousLabel,
  nextLabel,
}: PaginationProps) => {
  const inFirstPage = page === 1;
  const inLastPage = page * pageSize > totalItems;

  if (inFirstPage && inLastPage) return null;

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" disabled={inFirstPage} onClick={previous}>
            <ChevronLeftIcon />
            {previousLabel && (
              <span className="hidden md:inline-block">{previousLabel}</span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {inFirstPage ? "Estás en la primera página" : "Página anterior"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" disabled={inLastPage} onClick={next}>
            {nextLabel && (
              <span className="hidden md:inline-block">{nextLabel}</span>
            )}
            <ChevronRightIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {inLastPage ? "Estás en la última página" : "Página siguiente"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
