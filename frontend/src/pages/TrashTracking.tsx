import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { getVehiculesWithGeolocalisations } from '../services/api';

// Définir l'icône personnalisée pour les poubelles
const trashIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3515/3515567.png',
  iconSize: [32, 32], // Taille de l'icône
  iconAnchor: [16, 32], // Point d'ancrage de l'icône
  popupAnchor: [0, -32] // Point d'ancrage du popup
});

const TrashTracking = () => {
  const [trashBins, setTrashBins] = useState([]);

  const fetchTrashBins = async () => {
    try {
      const data = await getVehiculesWithGeolocalisations();
      setTrashBins(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des poubelles avec leurs géolocalisations', error);
    }
  };

  useEffect(() => {
    fetchTrashBins();
    const interval = setInterval(fetchTrashBins, 5000); // Actualiser toutes les 5 secondes
    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, []);

  return (
    <div>
      <MapContainer center={[-4.4419, 15.2663]} zoom={13} style={{ height: "95vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {trashBins.map(trashBin => (
          trashBin.latitude && trashBin.longitude && (
            <Marker key={trashBin.vehicule_id} position={[trashBin.latitude, trashBin.longitude]} icon={trashIcon}>
              <Popup>
                <div>
                  <strong>Type:</strong> {trashBin.marque}<br />
                  <strong>Modèle:</strong> {trashBin.modele}<br />
                  <strong>ID:</strong> PB-{trashBin.vehicule_id.toString().padStart(3, '0')}<br />
                  <strong>Collecteur:</strong> {trashBin.chauffeur_nom} {trashBin.chauffeur_prenom}<br />
                  <strong>Niveau:</strong> {Math.floor(Math.random() * 100)}%
                </div>
              </Popup>
              <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent>
                <span>PB-{trashBin.vehicule_id.toString().padStart(3, '0')}</span>
              </Tooltip>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default TrashTracking;