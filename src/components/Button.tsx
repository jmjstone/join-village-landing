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
    m-auto 
    px-10 sm:px-16 md:px-16 lg:px-16 xl:px-16 
    py-3 sm:py-6 md:py-6 lg:py-6 xl:py-6
    text-lg sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl
    font-semibold text-white
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
