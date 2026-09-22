
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}
    

const Button = ({children, className = "", ...props}: ButtonProps) => {
  return (
    <button className={`p-2 cursor-pointer border ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button