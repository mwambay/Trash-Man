import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface BackendResponse {}

// Fonction pour récupérer tous les chauffeurs
export const getChauffeurs = async (): Promise<BackendResponse> => {
  try {
    const response = await axios.get(`${API_URL}/chauffeurs`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des chauffeurs', error);
    throw error;
  }
};

// Fonction pour insérer un nouveau chauffeur
export const insertChauffeur = async (nom: string, prenom: string, permis: string, telephone: string): Promise<BackendResponse> => {
  try {
    const response = await axios.post(`${API_URL}/chauffeurs`, { nom, prenom, permis, telephone });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'insertion du chauffeur', error);
    throw error;
  }
};

// Fonction pour récupérer tous les véhicules
export const getVehicules = async (): Promise<BackendResponse> => {
  try {
    const response = await axios.get(`${API_URL}/vehicules`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules', error);
    throw error;
  }
};

// Fonction pour insérer un nouveau véhicule
export const insertVehicule = async (marque: string, modele: string, annee: number, imma: string, chauffeur_id: number): Promise<BackendResponse> => {
  try {
    const response = await axios.post(`${API_URL}/vehicules`, { marque, modele, annee, imma, chauffeur_id });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'insertion du véhicule', error);
    throw error;
  }
};

// Fonction pour récupérer toutes les géolocalisations
export const getGeolocalisations = async (): Promise<BackendResponse> => {
  try {
    const response = await axios.get(`${API_URL}/vehicules/geolocalisations`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des géolocalisations', error);
    throw error;
  }
};

// Fonction pour récupérer toutes les données capteurs
export const getDonneesCapteurs = async (): Promise<BackendResponse> => {
  try {
    const response = await axios.get(`${API_URL}/vehicules/donnees-capteurs`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données capteurs', error);
    throw error;
  }
};

// Fonction pour récupérer tous les chauffeurs avec leurs véhicules
export const getChauffeursWithVehicules = async (): Promise<BackendResponse> => {
  try {
    const response = await axios.get(`${API_URL}/chauffeurs/with-vehicules`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des chauffeurs avec leurs véhicules', error);
    throw error;
  }
};

// Fonction pour récupérer toutes les géolocalisations avec les données capteurs
export const getGeolocalisationsWithDonneesCapteurs = async (): Promise<BackendResponse> => {
  try {
    const response = await axios.get(`${API_URL}/vehicules/geolocalisations-with-donnees-capteurs`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des géolocalisations avec les données capteurs', error);
    throw error;
  }
};

// Fonction pour récupérer tous les véhicules avec leurs géolocalisations
export const getVehiculesWithGeolocalisations = async (): Promise<BackendResponse> => {
  try {
    const response = await axios.get(`${API_URL}/vehicules/with-geolocalisations`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules avec leurs géolocalisations', error);
    throw error;
  }
};

export const getAllVehiculesComplet = async (): Promise<BackendResponse> => {
  try {
    const response = await axios.get(`${API_URL}/vehicules/complet`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des véhicules complets', error);
    throw error;
  }
};

export const delVehicule = async (id: number): Promise<BackendResponse> => {
  try {
    const response = await axios.delete(`${API_URL}/vehicules/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du véhicule', error);
    throw error;
  }
};

export const delChauffeur = async (id: number): Promise<BackendResponse> => {
  try {
    const response = await axios.delete(`${API_URL}/chauffeurs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression du chauffeur', error);
    throw error;
  }
};
