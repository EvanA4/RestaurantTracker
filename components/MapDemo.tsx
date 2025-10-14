'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function MyPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/MapWrapper'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  return <div className='w-[50%] h-[50%]'>
    <Map />
  </div>
}