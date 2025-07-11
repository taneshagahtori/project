import React from 'react';

const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h1 className={`text-3xl font-bold text-foreground ${className}`} {...props}>{children}</h1>
);
const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h2 className={`text-lg font-semibold text-foreground ${className}`} {...props}>{children}</h2>
);
const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h3 className={`text-base font-semibold text-foreground ${className}`} {...props}>{children}</h3>
);
const Body: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...props }) => (
  <p className={`text-base text-foreground ${className}`} {...props}>{children}</p>
);
const Muted: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...props }) => (
  <p className={`text-base text-muted-foreground ${className}`} {...props}>{children}</p>
);

const Typography = { H1, H2, H3, Body, Muted };
export default Typography;
export { H1, H2, H3, Body, Muted }; 