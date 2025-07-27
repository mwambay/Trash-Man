import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Trash2 } from 'lucide-react';
import { getAllVehiculesComplet, insertVehicule, getChauffeurs, delVehicule } from '../services/api';
import { 
  MapPin, 
  Clock, 
  Gauge, 
  Fuel, 
  Battery, 
  Thermometer, 
  Timer,
  Activity,
  BarChart,
  AlertTriangle,
  Route
} from 'lucide-react';

interface Vehicle {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  chauffeur_id: number;
  chauffeur_nom: string;
  chauffeur_prenom: string;
  permis: string;
  telephone: string;
  latitude: string;
  longitude: string;
  geo_timestamp: string;
  vitesse_kmh: string;
  regime_moteur: number;
  niveau_carburant: string;
  consommation_moyenne: string;
  consommation_instantanee: string | null;
  systeme_catalyseur: boolean | null;
  infos_freinage: string | null;
  distance_parcourue: string | null;
  etat_batterie: string | null;
  temperature_gaz_echappement: string | null;
  temps_fonctionnement_moteur: string | null;
}

// Ajouter l'interface pour le nouveau véhicule
interface NewVehicle {
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  chauffeur_id: number;
}

const ListVehicle = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [chauffeurs, setChauffeurs] = useState<Array<{id: number, nom: string, prenom: string}>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState<NewVehicle>({
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    immatriculation: '',
    chauffeur_id: 1
  });

  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

    const fetchData = async () => {
      try {
        const [vehiclesData, chauffeursData] = await Promise.all([
          getAllVehiculesComplet(),
          getChauffeurs()
        ]);
        setVehicles(vehiclesData);
        setChauffeurs(chauffeursData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertVehicule(newVehicle.marque, newVehicle.modele, newVehicle.annee, newVehicle.immatriculation, newVehicle.chauffeur_id);
      setIsModalOpen(false);
      setConfirmationMessage('Le véhicule a bien été ajouté.');
      setNewVehicle({ marque: '', modele: '', annee: '2025', immatriculation: '', chauffeur_id: null });

      // Rafraîchir la liste
      fetchData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du véhicule', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await delVehicule(id);
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      setVehicleToDelete(null); // Hide the dialog after deletion
    } catch (error) {
      console.error('Erreur lors de la suppression du véhicule', error);
    }
  };

  const confirmDelete = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
  };

  const cancelDelete = () => {
    setVehicleToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Vehicle Tracking</h1>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Vehicle
          </button>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="mr-2 h-5 w-5" />
            Filter
          </button>
        </div>
      </div>
  
      {/* Message de confirmation */}
      {confirmationMessage && (
        <div className="rounded-lg bg-green-100 p-4 text-green-700">
          {confirmationMessage}
        </div>
      )}
  
      {/* Modal d'ajout de véhicule */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Ajouter un nouveau véhicule</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Marque</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newVehicle.marque}
                  onChange={(e) => setNewVehicle({...newVehicle, marque: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Modèle</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newVehicle.modele}
                  onChange={(e) => setNewVehicle({...newVehicle, modele: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Année</label>
                <input
                  type="number"
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newVehicle.annee}
                  onChange={(e) => setNewVehicle({...newVehicle, annee: parseInt(e.target.value)})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Immatriculation</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newVehicle.immatriculation}
                  onChange={(e) => setNewVehicle({...newVehicle, immatriculation: e.target.value})}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Chauffeur</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newVehicle.chauffeur_id}
                  onChange={(e) => setNewVehicle({...newVehicle, chauffeur_id: parseInt(e.target.value)})}
                >
                  <option value="">Sélectionner un chauffeur</option>
                  {chauffeurs.map((chauffeur) => (
                    <option key={chauffeur.id} value={chauffeur.id}>
                      {chauffeur.nom} {chauffeur.prenom}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      {/* Liste des véhicules */}
      <div className="rounded-lg bg-white shadow">
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900">Vehicle List</h2>
          <div className="mt-4 space-y-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{vehicle.marque} {vehicle.modele}</h3>
                    <p className="text-sm text-gray-500">Immatriculation: {vehicle.immatriculation}</p>
                    <p className="text-sm text-gray-500">Année: {vehicle.annee}</p>
                    <p className="text-sm text-gray-500">Chauffeur: {vehicle.chauffeur_nom} {vehicle.chauffeur_prenom}</p>
                  </div>
                  {/* <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Active
                  </span> */}

                          <button
                className="p-1 text-red-600 hover:text-red-800"
                onClick={() => confirmDelete(vehicle)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
                </div>
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-blue-500 hover:text-blue-600">
                    Voir plus de détails
                  </summary>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    {/* Localisation et Temps */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">Localisation & Temps</h4>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <p>Position: {vehicle.latitude}, {vehicle.longitude}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p>Mis à jour: {new Date(vehicle.geo_timestamp).toLocaleString()}</p>
                      </div>
                    </div>
  
                    {/* Performance */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-gray-500" />
                        <p>Vitesse: {vehicle.vitesse_kmh} km/h</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-gray-500" />
                        <p>Régime moteur: {vehicle.regime_moteur} tr/min</p>
                      </div>
                    </div>
  
                    {/* Consommation */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">Consommation</h4>
                      <div className="flex items-center space-x-2">
                        <Fuel className="h-4 w-4 text-gray-500" />
                        <p>Niveau carburant: {vehicle.niveau_carburant}%</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart className="h-4 w-4 text-gray-500" />
                        <p>Consommation moyenne: {vehicle.consommation_moyenne} L/100km</p>
                      </div>
                    </div>
  
                    {/* État du système */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">État du système</h4>
                      <div className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-gray-500" />
                        <p>Batterie: {vehicle.etat_batterie || 'N/A'}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-gray-500" />
                        <p>Système catalyseur: {vehicle.systeme_catalyseur ? 'Actif' : 'Inactif'}</p>
                      </div>
                    </div>
  
                    {/* Diagnostic */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">Diagnostic</h4>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-gray-500" />
                        <p>Température échappement: {vehicle.temperature_gaz_echappement}°C</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 text-gray-500" />
                        <p>Temps de fonctionnement: {vehicle.temps_fonctionnement_moteur}h</p>
                      </div>
                    </div>
  
                    {/* Distance */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">Parcours</h4>
                      <div className="flex items-center space-x-2">
                        <Route className="h-4 w-4 text-gray-500" />
                        <p>Distance parcourue: {vehicle.distance_parcourue || 'N/A'} km</p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>

      {vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <p>Êtes-vous sûr de vouloir supprimer le véhicule {vehicleToDelete.marque} {vehicleToDelete.modele} ?</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleDelete(vehicleToDelete.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Oui
              </button>
              <button
                onClick={cancelDelete}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ListVehicle;