import { writable } from 'svelte/store';

// Maak een winkelwagen store
export const cart = writable([]);

// Haal de gebruikers-ID op (kan bijvoorbeeld uit localStorage komen)
function getUserId() {
  return localStorage.getItem('userId'); // Haal de userId op uit localStorage
}

// Laad de winkelwagen uit localStorage of backend op basis van de gebruikers-ID
function loadCart() {
  const userId = getUserId(); // Haal de userId op

  if (userId) {
    // Als er een gebruiker is ingelogd, haal de winkelwagen op van die gebruiker
    const savedCart = localStorage.getItem(`cart_${userId}`); // Sla de winkelwagen op met de userId als sleutel
    if (savedCart) {
      cart.set(JSON.parse(savedCart)); // Zet de winkelwagen in de store
    } else {
      cart.set([]); // Als er geen winkelwagen is, stel deze in op een lege array
    }
  } else {
    // Als er geen gebruiker is ingelogd, haal de winkelwagen uit de algemene localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cart.set(JSON.parse(savedCart)); // Zet de winkelwagen in de store
    } else {
      cart.set([]); // Als er geen winkelwagen is, stel deze in op een lege array
    }
  }
}

// Sla de winkelwagen op in localStorage of bij de gebruiker
function saveCart() {
  cart.subscribe(items => {
    const userId = getUserId(); // Haal de userId op

    if (userId) {
      // Sla de winkelwagen op per gebruiker
      localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
    } else {
      // Sla de winkelwagen op in de algemene localStorage (voor als de gebruiker niet is ingelogd)
      localStorage.setItem('cart', JSON.stringify(items));
    }
  });
}

// Functie om de winkelwagen te verwijderen of te resetten (alleen als er geen gebruiker is ingelogd)
function clearLocalCart() {
  const userId = getUserId();
  
  if (userId) {
    // Als de gebruiker is ingelogd, slaan we de winkelwagen op per gebruiker
    localStorage.setItem(`cart_${userId}`, JSON.stringify([])); // Stel de winkelwagen in op een lege array
  } else {
    // Als de gebruiker niet is ingelogd, slaan we de algemene winkelwagen op in localStorage
    localStorage.setItem('cart', JSON.stringify([])); // Reset de winkelwagen
  }

  cart.set([]); // Reset de winkelwagen in de store
}

export { loadCart, saveCart, clearLocalCart };
