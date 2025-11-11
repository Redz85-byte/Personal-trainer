export function getTrainings() {
  return fetch(import.meta.env.VITE_API_URL + 'trainings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error when fetching customers: ' + response.statusText);
      }
      return response.json(); 
    });
}

export function getTrainingsWithCustomer() {
  return fetch(import.meta.env.VITE_API_URL + 'gettrainings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error when fetching trainings with customers: ' + response.statusText);
      }
      return response.json();
    });
}