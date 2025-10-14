// src/components/Map.tsx
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { LatLngTuple } from "leaflet";

export default function MyMap(props: any) {
  // const { position, zoom } = props
  const position: LatLngTuple = [35.155556, -90.051944];

  return <MapContainer center={position} zoom={15} scrollWheelZoom={true} className="h-full w-full">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
}