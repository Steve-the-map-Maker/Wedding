import React from 'react';
export default function ParallaxDivider({ imageSrc, height='h-64 md:h-80'}){return(<div className={`${height} w-full bg-fixed bg-cover bg-center`} style={{backgroundImage:`url(${imageSrc})`}} aria-hidden="true" />);} 
