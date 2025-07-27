import React, { useState, useEffect } from 'react';
import { getChauffeurs, insertChauffeur, delChauffeur, getChauffeursWithVehicules } from '../services/api';
import { Trash2, UserPlus} from 'lucide-react';


interface Chauffeur {
  id: number;
  nom: string;
  prenom: string;
  permis: string;
  telephone: string;
  marque: string;
  modele: string
}

const ListChauffeur = () => {
  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
  const [chauffeurToDelete, setChauffeurToDelete] = useState<Chauffeur | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChauffeur, setNewChauffeur] = useState({
    nom: '',
    prenom: '',
    permis: '',
    telephone: ''  });

  const fetchChauffeurs = async () => {
    try {
      const data = await getChauffeursWithVehicules();
      setChauffeurs(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des chauffeurs', error);
    }
  };

  useEffect(() => {
    fetchChauffeurs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertChauffeur(
        newChauffeur.nom,
        newChauffeur.prenom,
        newChauffeur.permis,
        newChauffeur.telephone,
      );
      setIsModalOpen(false);
      setNewChauffeur({ nom: '', prenom: '', permis: '', telephone: '' });
      fetchChauffeurs();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du chauffeur', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await delChauffeur(id);
      setChauffeurToDelete(null);
      fetchChauffeurs();
    } catch (error) {
      console.error('Erreur lors de la suppression du chauffeur', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Liste des Chauffeurs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <UserPlus />
          Ajouter un chauffeur
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Prénom</th>
              <th className="px-6 py-3 text-left">Permis</th>
              <th className="px-6 py-3 text-left">Téléphone</th>
              <th className="px-6 py-3 text-left">Vehicule</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chauffeurs.map(chauffeur => (
              <tr key={chauffeur.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{chauffeur.id}</td>
                <td className="px-6 py-4">{chauffeur.nom}</td>
                <td className="px-6 py-4">{chauffeur.prenom}</td>
                <td className="px-6 py-4">{chauffeur.permis}</td>
                <td className="px-6 py-4">{chauffeur.telephone}</td>
                <td className="px-6 py-4">{chauffeur.marque + " " + chauffeur.modele}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setChauffeurToDelete(chauffeur)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter un nouveau chauffeur</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newChauffeur.nom}
                  onChange={(e) => setNewChauffeur({...newChauffeur, nom: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newChauffeur.prenom}
                  onChange={(e) => setNewChauffeur({...newChauffeur, prenom: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Permis</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newChauffeur.permis}
                  onChange={(e) => setNewChauffeur({...newChauffeur, permis: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  value={newChauffeur.telephone}
                  onChange={(e) => setNewChauffeur({...newChauffeur, telephone: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {chauffeurToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer le chauffeur {chauffeurToDelete.nom} {chauffeurToDelete.prenom} ?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setChauffeurToDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(chauffeurToDelete.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListChauffeur;