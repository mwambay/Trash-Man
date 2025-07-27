import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { getVehiculesWithGeolocalisations } from '../services/api';

// Définir l'icône personnalisée
const carIcon = new L.Icon({
  iconUrl: '/images/car145.png', // Remplacez par le chemin de votre icône de voiture
  iconSize: [32, 32], // Taille de l'icône
  iconAnchor: [16, 32], // Point d'ancrage de l'icône
  popupAnchor: [0, -32] // Point d'ancrage du popup
});


const VehicleTracking = () => {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const data = await getVehiculesWithGeolocalisations();
      setVehicles(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules avec leurs géolocalisations', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000); // Actualiser toutes les 5 secondes
    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, []);

  return (
    <div>
      <MapContainer center={[-4.4419, 15.2663]} zoom={13} style={{ height: "95vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {vehicles.map(vehicle => (
          vehicle.latitude && vehicle.longitude && (
            <Marker key={vehicle.vehicule_id} position={[vehicle.latitude, vehicle.longitude]} icon={carIcon}>
              <Popup>
                <div>
                  <strong>Marque:</strong> {vehicle.marque}<br />
                  <strong>Modèle:</strong> {vehicle.modele}<br />
                  <strong>ID:</strong> {vehicle.vehicule_id}<br />
                  <strong>Chauffeur:</strong> {vehicle.chauffeur_nom} {vehicle.chauffeur_prenom}
                </div>
              </Popup>
              <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
                <span>{vehicle.marque} {vehicle.modele}</span>
              </Tooltip>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default VehicleTracking;