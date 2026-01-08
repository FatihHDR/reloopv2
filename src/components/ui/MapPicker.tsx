import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';

interface MapPickerProps {
  onSelectLocation: (data: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function DraggableMarker({
  position,
  setPosition,
  onAddressChange,
}: any) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onAddressChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <Marker
      draggable
      position={position}
      icon={markerIcon}
      eventHandlers={{
        dragend: (e) => {
          const latlng = e.target.getLatLng();
          setPosition(latlng);
          onAddressChange(latlng.lat, latlng.lng);
        },
      }}
    />
  );
}

export default function MapPicker({ onSelectLocation }: MapPickerProps) {
  const [position, setPosition] = useState({
    lat: -7.2575,
    lng: 112.7521,
  });

  const [address, setAddress] = useState('Pilih lokasi di peta');

  const getAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      const addr = data.display_name || `${lat}, ${lng}`;
      setAddress(addr);

      onSelectLocation({
        lat,
        lng,
        address: addr,
      });
    } catch {
      setAddress('Gagal mengambil alamat');
    }
  };

  useEffect(() => {
    getAddress(position.lat, position.lng);
  }, []);

  return (
    <div className="space-y-3">
      <div className="h-72 mb-6 w-full rounded-2xl overflow-hidden border border-border">
        <MapContainer
          center={position}
          zoom={15}
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <DraggableMarker
            position={position}
            setPosition={setPosition}
            onAddressChange={getAddress}
          />
        </MapContainer>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <p className="text-sm font-semibold text-foreground mb-1">
          Alamat terpilih
        </p>
        <p className="text-sm text-muted-foreground">{address}</p>

        <p className="text-xs text-muted-foreground mt-2">
          Lat: {position.lat.toFixed(6)} | Lng: {position.lng.toFixed(6)}
        </p>
      </div>
    </div>
  );
}
