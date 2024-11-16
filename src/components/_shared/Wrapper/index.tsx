import React from 'react';

interface WrapperComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export default function WrapperComponent({
  children,
  className,
}: WrapperComponentProps) {
  return (
    <>
      <div
        className={`w-[100%] px-4 box-border flex justify-center bg-transparent overflow-x-hidden ${className}`}
      >
        <div className='w-full max-w-[1180px]'>{children}</div>
      </div>
    </>
  );
}
