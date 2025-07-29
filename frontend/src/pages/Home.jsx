import React from 'react';
import PropertyCarousel from '../components/PropertyCarousel';

const propertiesByCity = {
  Quito: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      title: 'Departamento moderno en el centro',
      location: 'Quito, Ecuador',
      price: '120,000',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      title: 'Casa familiar con jardín',
      location: 'Quito, Ecuador',
      price: '180,000',
    },
  ],
  Guayaquil: [
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      title: 'Ático con vista al río',
      location: 'Guayaquil, Ecuador',
      price: '150,000',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      title: 'Casa con piscina',
      location: 'Guayaquil, Ecuador',
      price: '220,000',
    },
  ],
  Cuenca: [
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      title: 'Apartamento colonial',
      location: 'Cuenca, Ecuador',
      price: '90,000',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      title: 'Condo moderno',
      location: 'Cuenca, Ecuador',
      price: '110,000',
    },
  ],
};

const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '2rem 0 1rem 0' }}>PropFinder</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem' }}>
        Marketplace inmobiliario para encontrar, publicar y contactar propiedades fácilmente.
      </p>
      <h2 style={{ marginLeft: '2rem', marginBottom: '1rem' }}>Propiedades en Quito</h2>
      <PropertyCarousel properties={propertiesByCity.Quito} />
    </div>
  );
};

export default Home;
