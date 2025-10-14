'use client';

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { LatLngTuple } from "leaflet";

function MapWrapper(props: {
	position: number[],
	zoom: number,
	className?: string
}) {
	const position = props.position as LatLngTuple;
	const zoom = props.zoom;

	return (
		<MapContainer center={position} zoom={15} scrollWheelZoom={true} className={props.className}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>
				The divine Bass Pro Shop pyramid. <br /> A modern world wonder.
				</Popup>
			</Marker>
		</MapContainer>
	);
}

export default MapWrapper;