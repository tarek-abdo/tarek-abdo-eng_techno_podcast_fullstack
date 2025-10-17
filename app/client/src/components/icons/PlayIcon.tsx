import React from 'react';

interface PlayIconProps {
  className?: string;
}

export default function PlayIcon({ className = '' }: PlayIconProps){
  return (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5.5L19 12L5 18.5V5.5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
}
