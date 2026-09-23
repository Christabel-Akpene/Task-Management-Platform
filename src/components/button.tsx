import type { ButtonProps } from "../types"

const Button = ({children, className = "", ...props}: ButtonProps) => {
  return (
    <button className={`p-2 cursor-pointer border ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button
