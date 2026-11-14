import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "../utils";

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-xl border border-[var(--border)] bg-[var(--bg-elev-1)]">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm text-left", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "border-b border-[var(--border)] bg-[var(--bg-elev-2)]/60 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[var(--border)] bg-[var(--bg-elev-2)]/40 font-medium text-[var(--text)]",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    tabIndex={0}
    className={cn(
      "border-b border-[var(--border)]/60 transition-colors focus:bg-[var(--bg-elev-2)] focus:outline-none hover:bg-[var(--bg-elev-2)]/50 data-[state=selected]:bg-[var(--bg-elev-2)]",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable, sortDirection, onSort, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-[var(--text-muted)] select-none",
        sortable && "cursor-pointer hover:text-[var(--text)] transition-colors",
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        <span>{children}</span>
        {sortable && (
          <span className="shrink-0 text-[var(--text-muted)]">
            {sortDirection === "asc" && <ArrowUp className="h-3.5 w-3.5 text-[var(--accent)]" />}
            {sortDirection === "desc" && <ArrowDown className="h-3.5 w-3.5 text-[var(--accent)]" />}
            {!sortDirection && <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />}
          </span>
        )}
      </div>
    </th>
  )
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle text-[var(--text)] font-normal", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs text-[var(--text-muted)] italic", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
