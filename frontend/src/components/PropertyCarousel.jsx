import React, { useState, useEffect } from 'react';
import './PropertyCarousel.css';

const PropertyCarousel = ({ properties }) => {
  const [current, setCurrent] = useState(0);
  const total = properties.length;
  const visible = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => {
        // Si quedan menos de 3 al final, vuelve al inicio
        if (c + visible >= total) return 0;
        return c + visible;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  // Obtener el grupo de 3 propiedades sin duplicar
  const visibleProperties = properties.slice(current, current + visible);

  // Si quedan menos de 3 al final, mostrar los primeros para completar el grupo
  if (visibleProperties.length < visible && total > 0) {
    visibleProperties.push(...properties.slice(0, visible - visibleProperties.length));
  }

  return (
    <div className="carousel-container">
      {visibleProperties.map((property, idx) => (
        <div className="carousel-card" key={property.id || idx}>
          <img src={property.image} alt={property.title} className="carousel-img" />
          <div className="carousel-info">
            <h2 className="carousel-title">{property.title}</h2>
            <p className="carousel-location">{property.location}</p>
            <p className="carousel-price">${property.price}</p>
            <button className="carousel-contact">Contactar agente</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCarousel;
