import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Trash2, Recycle } from 'lucide-react';
import { getAllVehiculesComplet, insertVehicule, getChauffeurs, delVehicule } from '../services/api';
import { 
  MapPin, 
  Clock, 
  Gauge, 
  BarChart3, 
  Battery, 
  Thermometer, 
  Timer,
  Activity,
  AlertTriangle,
  Route
} from 'lucide-react';

interface TrashBin {
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
  niveau_remplissage: string;
  capacite_totale: number;
  type_dechets: string;
  derniere_collecte: string | null;
  capteur_poids: boolean | null;
  capteur_niveau: string | null;
  temperature_interne: string | null;
  etat_batterie: string | null;
  temps_depuis_collecte: string | null;
}

// Ajouter l'interface pour la nouvelle poubelle
interface NewTrashBin {
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  chauffeur_id: number;
}

const ListTrash = () => {
  const [trashBins, setTrashBins] = useState<TrashBin[]>([]);
  const [collecteurs, setCollecteurs] = useState<Array<{id: number, nom: string, prenom: string}>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrashBin, setNewTrashBin] = useState<NewTrashBin>({
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    immatriculation: '',
    chauffeur_id: 1
  });

  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [trashBinToDelete, setTrashBinToDelete] = useState<TrashBin | null>(null);

    const fetchData = async () => {
      try {
        const [trashBinsData, collecteursData] = await Promise.all([
          getAllVehiculesComplet(),
          getChauffeurs()
        ]);
        setTrashBins(trashBinsData);
        setCollecteurs(collecteursData);
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
      await insertVehicule(newTrashBin.marque, newTrashBin.modele, newTrashBin.annee, newTrashBin.immatriculation, newTrashBin.chauffeur_id);
      setIsModalOpen(false);
      setConfirmationMessage('La poubelle a bien été ajoutée.');
      setNewTrashBin({ marque: '', modele: '', annee: 2025, immatriculation: '', chauffeur_id: 1 });

      // Rafraîchir la liste
      fetchData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la poubelle', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await delVehicule(id);
      setTrashBins(trashBins.filter(trashBin => trashBin.id !== id));
      setTrashBinToDelete(null); // Hide the dialog after deletion
    } catch (error) {
      console.error('Erreur lors de la suppression de la poubelle', error);
    }
  };

  const confirmDelete = (trashBin: TrashBin) => {
    setTrashBinToDelete(trashBin);
  };

  const cancelDelete = () => {
    setTrashBinToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Gestion des Poubelles</h1>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            Ajouter Poubelle
          </button>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher poubelles..."
              className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="mr-2 h-5 w-5" />
            Filtrer
          </button>
        </div>
      </div>
  
      {/* Message de confirmation */}
      {confirmationMessage && (
        <div className="rounded-lg bg-green-100 p-4 text-green-700">
          {confirmationMessage}
        </div>
      )}
  
      {/* Modal d'ajout de poubelle */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Ajouter une nouvelle poubelle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Plastique, Organique, Verre..."
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newTrashBin.marque}
                  onChange={(e) => setNewTrashBin({...newTrashBin, marque: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Modèle</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 240L, 120L, Conteneur..."
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newTrashBin.modele}
                  onChange={(e) => setNewTrashBin({...newTrashBin, modele: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Année d'installation</label>
                <input
                  type="number"
                  required
                  min="1900"
                  max={new Date().getFullYear()}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newTrashBin.annee}
                  onChange={(e) => setNewTrashBin({...newTrashBin, annee: parseInt(e.target.value)})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Code d'identification</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: PB-001"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newTrashBin.immatriculation}
                  onChange={(e) => setNewTrashBin({...newTrashBin, immatriculation: e.target.value})}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700">Collecteur assigné</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newTrashBin.chauffeur_id}
                  onChange={(e) => setNewTrashBin({...newTrashBin, chauffeur_id: parseInt(e.target.value)})}
                >
                  <option value="">Sélectionner un collecteur</option>
                  {collecteurs.map((collecteur) => (
                    <option key={collecteur.id} value={collecteur.id}>
                      {collecteur.nom} {collecteur.prenom}
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
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      {/* Liste des poubelles */}
      <div className="rounded-lg bg-white shadow">
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900">Liste des Poubelles</h2>
          <div className="mt-4 space-y-4">
            {trashBins.map((trashBin) => (
              <div key={trashBin.id} className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Poubelle {trashBin.marque} - {trashBin.modele}</h3>
                    <p className="text-sm text-gray-500">Code: {trashBin.immatriculation}</p>
                    <p className="text-sm text-gray-500">Installée en: {trashBin.annee}</p>
                    <p className="text-sm text-gray-500">Collecteur: {trashBin.chauffeur_nom} {trashBin.chauffeur_prenom}</p>
                  </div>

                  <button
                className="p-1 text-red-600 hover:text-red-800"
                onClick={() => confirmDelete(trashBin)}
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
                        <p>Position: {trashBin.latitude}, {trashBin.longitude}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p>Mis à jour: {new Date(trashBin.geo_timestamp).toLocaleString()}</p>
                      </div>
                    </div>
  
                    {/* État de remplissage */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">État de remplissage</h4>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-gray-500" />
                        <p>Niveau: {Math.floor(Math.random() * 100)}%</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Recycle className="h-4 w-4 text-gray-500" />
                        <p>Capacité: 240L</p>
                      </div>
                    </div>
  
                    {/* Type de déchets */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">Type de déchets</h4>
                      <div className="flex items-center space-x-2">
                        <Trash2 className="h-4 w-4 text-gray-500" />
                        <p>Type: {trashBin.marque}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p>Dernière collecte: {Math.floor(Math.random() * 7)} jours</p>
                      </div>
                    </div>
  
                    {/* État des capteurs */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">État des capteurs</h4>
                      <div className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-gray-500" />
                        <p>Batterie: {trashBin.etat_batterie || '85%'}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-gray-500" />
                        <p>Capteur niveau: Actif</p>
                      </div>
                    </div>
  
                    {/* Conditions environnementales */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">Conditions</h4>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-4 w-4 text-gray-500" />
                        <p>Température: {Math.floor(Math.random() * 30 + 10)}°C</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-gray-500" />
                        <p>État: {Math.random() > 0.8 ? 'Maintenance requise' : 'Bon état'}</p>
                      </div>
                    </div>
  
                    {/* Collecte */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 mb-2">Collecte</h4>
                      <div className="flex items-center space-x-2">
                        <Route className="h-4 w-4 text-gray-500" />
                        <p>Prochaine collecte: {Math.floor(Math.random() * 3 + 1)} jours</p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>

      {trashBinToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <p>Êtes-vous sûr de vouloir supprimer la poubelle {trashBinToDelete.marque} {trashBinToDelete.modele} ?</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleDelete(trashBinToDelete.id)}
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
export default ListTrash;