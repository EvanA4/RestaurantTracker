'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

function MapDemo() {
	const MapWrapper = useMemo(() => dynamic(
		() => import('@/components/MapWrapper'),
		{ 
			loading: () => <p>A map is loading</p>,
			ssr: false
		}
	), []);

	return (
		<MapWrapper position={[35.155556, -90.051944]} zoom={15} className='w-[50%] h-[50%]'/>
	);
}

export default MapDemo;