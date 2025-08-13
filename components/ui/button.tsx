import * as React from "react";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700",
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";

export default Button;
