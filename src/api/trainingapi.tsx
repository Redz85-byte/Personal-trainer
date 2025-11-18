import type { NewTraining } from "../types";

export function getTrainings() {
  return fetch(import.meta.env.VITE_API_URL + '/trainings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error when fetching customers: ' + response.statusText);
      }
      return response.json(); 
    });
}

export function getTrainingsWithCustomer() {
  return fetch(import.meta.env.VITE_API_URL + '/gettrainings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error when fetching trainings with customers: ' + response.statusText);
      }
      return response.json();
    });
}


export function deleteTraining(id: number) {
  return fetch(`${import.meta.env.VITE_API_URL}/trainings/${id}`, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Error when deleting training: " + response.statusText);
    }
  });
}


export function addTraining(newTraining: NewTraining) {
  return fetch(import.meta.env.VITE_API_URL + "/trainings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTraining),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Error when adding a new training");
    }
    return response.json();
  });
}
