import axios from 'axios';

export async function createAddWorker(data) {
  try {
    const response = await axios.post('/api/v1/add-worker/create', data);
    return response.data;
  } catch (error) {
    console.error('createAddWorker error:', error);
    throw error;
  }
}

export async function updateAddWorker(data) {
  try {
    const response = await axios.put('/api/v1/add-worker/update', data);
    return response.data;
  } catch (error) {
    console.error('updateAddWorker error:', error);
    throw error;
  }
}

export async function deleteAddWorker(id) {
  try {
    const response = await axios.delete(`/api/v1/add-worker/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('deleteAddWorker error:', error);
    throw error;
  }
}

export async function infoAddWorker(id) {
  try {
    const response = await axios.get(`/api/v1/add-worker/info/${id}`);
    return response.data;
  } catch (error) {
    console.error('infoAddWorker error:', error);
    throw error;
  }
}

export async function readAddWorkers() {
  try {
    const response = await axios.get('/api/v1/add-worker/read');
    return response.data;
  } catch (error) {
    console.error('readAddWorkers error:', error);
    throw error;
  }
}

export async function searchAddWorker(searchParams) {
  try {
    const response = await axios.get('/api/v1/add-worker/search', {
      params: searchParams
    });
    return response.data;
  } catch (error) {
    console.error('searchAddWorker error:', error);
    throw error;
  }
}

export async function getPermissions() {
  try {
    const response = await axios.get(`/api/v1/add-worker/read-status/`);
    return response.data;
  } catch (error) {
    console.error('readAddWorker error:', error);
    throw error;
  }
}