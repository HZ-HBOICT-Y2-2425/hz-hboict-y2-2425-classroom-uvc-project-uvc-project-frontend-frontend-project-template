<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let product = {};  
  let user = {};  
  let storedUser = {};  
  let userLocation = null;  
  let sellerPostcodeLocation = null;  
  let distance = null;  
  let isLoading = true;
  let error = null;

  // Haversine-formule om de afstand te berekenen
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Aardradius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Verschil in breedtegraad
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Verschil in lengtegraad
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Afstand in km

    console.log(`Afstand berekend: ${distance} km`);
    return distance;
  }

  async function fetchLocationFromPostcode(postcode) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(postcode)}&countrycodes=NL`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    } else {
      throw new Error('Geen locatie gevonden voor de opgegeven postcode.');
    }
  }

  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            reject("Fout bij het ophalen van je locatie: " + error.message);
          },
          { enableHighAccuracy: true }
        );
      } else {
        reject("Geolocatie niet ondersteund in deze browser.");
      }
    });
  }

  onMount(async () => {
    const productId = $page.params.id; // Haal de product id uit de URL
    try {
      const response = await fetch(`http://localhost:3010/products/product/${productId}`);
      if (!response.ok) throw new Error('Gefaald om product te laden');
      product = await response.json();

      const sellerResponse = await fetch(`http://localhost:3010/user/${product.userID}`);
      if (!sellerResponse.ok) {
        throw new Error('Fout bij het ophalen van gebruikersinformatie');
      }
      user = await sellerResponse.json();

      if (user.zipcode) {
        try {
          sellerPostcodeLocation = await fetchLocationFromPostcode(user.zipcode);
        } catch (err) {
          console.error('Fout bij het ophalen van de verkoper locatie:', err);
          sellerPostcodeLocation = null; // Stel sellerPostcodeLocation in op null als locatie niet gevonden is
        }
      }

      try {
        userLocation = await getUserLocation();
        console.log('Gebruiker locatie:', userLocation); 

        if (userLocation && sellerPostcodeLocation) {
          distance = calculateDistance(
            userLocation.lat,
            userLocation.lon,
            sellerPostcodeLocation.lat,
            sellerPostcodeLocation.lon
          );
          
          // Als de postcode van de gebruiker hetzelfde is als die van de verkoper
          if (user.zipcode === product.zipcode) {
            distance = "<1 km"; // Als de postcode hetzelfde is, toon "<1 km"
          }

          if (distance < 1) {
            distance = "<1 km"; // Als de afstand kleiner is dan 1 km, geef dit weer als "<1 km"
          } else {
            distance = Math.round(distance);  // Anders, afronden naar een heel getal
          }

          console.log(`Afstand tussen jou en de verkoper: ${distance}`);
        }

      } catch (err) {
        console.error(err);
        distance = null;  // Stel de afstand in op null als er een fout is
      }

    } catch (err) {
      console.error('Fout bij het laden van product of gebruiker:', err);
    } finally {
      isLoading = false;
    }
  });
</script>

{#if isLoading}
  <p class="text-center text-gray-600 mt-8">Product details worden geladen...</p>
{:else if error}
  <p class="text-center text-red-600">{error}</p>
{:else if product.id}
  <div class="product-detail max-w-4xl mx-auto p-8 bg-gray-100 border border-gray-300 rounded-lg shadow-lg mt-8">
    <h1 class="text-2xl font-bold text-green-700 mb-4">{product.title}</h1>
    <img src="https://via.placeholder.com/800x400" alt="{product.title}" class="w-full h-auto rounded-lg mb-4" />
    <p class="mb-2"><strong>Omschrijving:</strong> {product.description}</p>
    <p class="mb-2"><strong>Prijs:</strong> <span class="text-green-700 font-bold text-xl">€{product.price.toFixed(2)}</span></p>
    <p class="mb-2"><strong>Hoeveelheid:</strong> {product.amount} {product.unit}</p>
    <p class="mb-2"><strong>Gereserveerd:</strong> {product.reserved ? 'Ja' : 'Nee'}</p>
    <p class="mb-2"><strong>Ten minste houdbaar tot:</strong> {product.expirationDate || 'Niet beschikbaar'}</p>

    {#if distance !== null}
      <p class="mt-4"><strong>Afstand naar verkoper:</strong> {distance}</p>
    {/if}
  </div>
{:else}
  <p class="text-center text-gray-600">Product niet gevonden</p>
{/if}
