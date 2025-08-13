import * as React from "react";
import clsx from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(
        "w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm",
        "placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
export default Input;
