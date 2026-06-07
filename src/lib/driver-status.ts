// Driver status config — edit this file to update availability
// Hamdani: just change `available: true/false` and `currentTrip`/`nextAvailable`, then git push

export interface DriverStatus {
  available: boolean;
  currentTrip: string | null;
  nextAvailable: string | null; // e.g. "Jun 12" or null if available now
}

export const driverStatus: Record<string, DriverStatus> = {
  aalim: {
    available: true,
    currentTrip: null,
    nextAvailable: null,
  },
  umair: {
    available: true,
    currentTrip: null,
    nextAvailable: null,
  },
};

export const allDriversBusy = !driverStatus.aalim.available && !driverStatus.umair.available;
