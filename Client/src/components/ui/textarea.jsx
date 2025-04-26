// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Textarea({
//   className,
//   ...props
// },ref) {
//   return (
//     <textarea
//       data-slot="textarea"
//       className={cn(
//         "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         className
//       )}
//     ref={ref}
//       {...props} />
//   );
// }

// export { Textarea }


import React, { forwardRef } from "react";
import { cn } from "@/lib/utils"; // make sure this exists or replace with your own classnames function

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };