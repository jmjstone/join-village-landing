import Link from "next/link";
import React from "react";

// Using TypeScript to define the component's props for type safety and autocompletion.
interface ButtonProps {
  href: string; // The URL the button will link to
  children: React.ReactNode; // The content inside the button (e.g., text)
  className?: string; // Optional: for any extra, one-off styling
}

const Button = ({ href, children, className = "" }: ButtonProps) => {
  // Base classes for all buttons. We'll add any custom classes to this.
  const baseClasses = `
    inline-block
    mt-5 
    m-auto 
    text-[24px] 
    px-16 py-6
    text-lg font-semibold text-white
    bg-black
    rounded-full
    shadow-sm

    
    transform /* Explicityly enables transforms */
    transition /* animate scale color etc */
    duration-300


    hover:bg-[#6ea215]
    hover:scale-105
    active:scale-95
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EA215]

  `;

  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
