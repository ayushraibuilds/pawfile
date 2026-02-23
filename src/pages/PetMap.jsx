import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, Coffee, Scissors, ShieldPlus, Dog, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './PetMap.css';

// Fix for default Leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const PLACES = [
    {
        id: 1,
        type: 'vets',
        name: 'Dr. Smith Veterinary',
        rating: 4.9,
        reviews: 128,
        tags: 'General Practice • Surgery',
        distance: '1.2 miles',
        status: 'Open Now',
        image: 'https://images.unsplash.com/photo-1584820927498-cafe2c1c6a63?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        position: [40.7128, -74.0060], // NY Center
        address: '451 Pet Avenue, New York, NY 10001'
    },
    {
        id: 2,
        type: 'vets',
        name: 'City Pet Hospital',
        rating: 4.7,
        reviews: 89,
        tags: '24/7 Emergency • Specialists',
        distance: '2.5 miles',
        status: '24/7',
        statusClass: 'text-emergency',
        image: 'https://images.unsplash.com/photo-1629897143976-7fb0b9ccfa9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        position: [40.7200, -74.0100],
        address: '890 Rescue Blvd, New York, NY 10002'
    },
    {
        id: 3,
        type: 'vets',
        name: 'Downtown Animal Care',
        rating: 4.5,
        reviews: 45,
        tags: 'Holistic • Dental',
        distance: '3.1 miles',
        status: 'Closes 6 PM',
        statusClass: 'closed-status',
        image: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        position: [40.7050, -74.0150],
        address: '22 Wag Street, New York, NY 10004'
    }
];

// Component to dynamically recenter map
function ChangeView({ center }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
}

const PetMap = () => {
    const [activeTab, setActiveTab] = useState('vets');
    const [selectedPlace, setSelectedPlace] = useState(PLACES[0]);

    // Filter places by tab (currently mock data is only vets, but filtering logic is here)
    const filteredPlaces = PLACES.filter(p => p.type === activeTab || activeTab === 'vets');

    return (
        <div className="pet-map-page animate-fade-in">
            <header className="page-header map-header">
                <div>
                    <h1 className="greeting">Pet Map</h1>
                    <p className="subtitle">Discover pet-friendly places, verified by the PAWFILE community.</p>
                </div>
                <div className="map-search-bar">
                    <Search size={18} className="text-muted" />
                    <input type="text" placeholder="Search places in New York..." />
                </div>
            </header>

            <div className="map-layout">
                <div className="map-sidebar">
                    <div className="map-tabs">
                        <button className={`map-tab ${activeTab === 'vets' ? 'active' : ''}`} onClick={() => setActiveTab('vets')}>
                            <ShieldPlus size={16} /> Vets
                        </button>
                        <button className={`map-tab ${activeTab === 'parks' ? 'active' : ''}`} onClick={() => setActiveTab('parks')}>
                            <Dog size={16} /> Parks
                        </button>
                        <button className={`map-tab ${activeTab === 'cafes' ? 'active' : ''}`} onClick={() => setActiveTab('cafes')}>
                            <Coffee size={16} /> Cafes
                        </button>
                        <button className={`map-tab ${activeTab === 'groomers' ? 'active' : ''}`} onClick={() => setActiveTab('groomers')}>
                            <Scissors size={16} /> Groomers
                        </button>
                    </div>

                    <div className="place-list">
                        {filteredPlaces.map(place => (
                            <div
                                key={place.id}
                                className={`place-card ${selectedPlace?.id === place.id ? 'selected' : ''}`}
                                onClick={() => setSelectedPlace(place)}
                            >
                                <img src={place.image} alt={place.name} className="place-img" />
                                <div className="place-info">
                                    <h3>{place.name}</h3>
                                    <div className="place-rating">
                                        <Star size={14} fill="#f39c12" color="#f39c12" />
                                        <span>{place.rating} ({place.reviews} reviews)</span>
                                    </div>
                                    <p className="place-tags">{place.tags}</p>
                                    <div className="place-meta">
                                        <span>{place.distance}</span>
                                        <span className={`open-status ${place.statusClass || ''}`}>{place.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="map-view-container glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                    <MapContainer
                        center={selectedPlace.position}
                        zoom={13}
                        style={{ height: '100%', width: '100%', borderRadius: '24px' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <ChangeView center={selectedPlace.position} />

                        {filteredPlaces.map(place => (
                            <Marker
                                key={place.id}
                                position={place.position}
                                eventHandlers={{
                                    click: () => {
                                        setSelectedPlace(place);
                                    },
                                }}
                            >
                                <Popup>
                                    <div className="leaflet-popup-custom">
                                        <h4 style={{ margin: '0 0 4px', fontSize: '14px' }}>{place.name}</h4>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{place.address}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default PetMap;
