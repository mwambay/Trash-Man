import React, { useState, useEffect } from 'react';
import { getChauffeurs, insertChauffeur, delChauffeur, getChauffeursWithVehicules } from '../services/api';
import { Trash2, UserPlus} from 'lucide-react';


interface Collecteur {
  id: number;
  nom: string;
  prenom: string;
  permis: string;
  telephone: string;
  marque: string;
  modele: string
}

const ListCollector = () => {
  const [collecteurs, setCollecteurs] = useState<Collecteur[]>([]);
  const [collecteurToDelete, setCollecteurToDelete] = useState<Collecteur | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCollecteur, setNewCollecteur] = useState({
    nom: '',
    prenom: '',
    permis: '',
    telephone: ''  });

  const fetchCollecteurs = async () => {
    try {
      const data = await getChauffeursWithVehicules();
      setCollecteurs(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des collecteurs', error);
    }
  };

  useEffect(() => {
    fetchCollecteurs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertChauffeur(
        newCollecteur.nom,
        newCollecteur.prenom,
        newCollecteur.permis,
        newCollecteur.telephone,
      );
      setIsModalOpen(false);
      setNewCollecteur({ nom: '', prenom: '', permis: '', telephone: '' });
      fetchCollecteurs();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du collecteur', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await delChauffeur(id);
      setCollecteurToDelete(null);
      fetchCollecteurs();
    } catch (error) {
      console.error('Erreur lors de la suppression du collecteur', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Liste des Collecteurs</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <UserPlus />
          Ajouter un collecteur
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
              <th className="px-6 py-3 text-left">Zone assignée</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collecteurs.map(collecteur => (
              <tr key={collecteur.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{collecteur.id}</td>
                <td className="px-6 py-4">{collecteur.nom}</td>
                <td className="px-6 py-4">{collecteur.prenom}</td>
                <td className="px-6 py-4">{collecteur.permis}</td>
                <td className="px-6 py-4">{collecteur.telephone}</td>
                <td className="px-6 py-4">Secteur {collecteur.id}</td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => setCollecteurToDelete(collecteur)}
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
            <h2 className="text-xl font-bold mb-4">Ajouter un nouveau collecteur</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newCollecteur.nom}
                  onChange={(e) => setNewCollecteur({...newCollecteur, nom: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newCollecteur.prenom}
                  onChange={(e) => setNewCollecteur({...newCollecteur, prenom: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Permis</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newCollecteur.permis}
                  onChange={(e) => setNewCollecteur({...newCollecteur, permis: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                  value={newCollecteur.telephone}
                  onChange={(e) => setNewCollecteur({...newCollecteur, telephone: e.target.value})}
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
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {collecteurToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer le collecteur {collecteurToDelete.nom} {collecteurToDelete.prenom} ?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setCollecteurToDelete(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(collecteurToDelete.id)}
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

export default ListCollector;