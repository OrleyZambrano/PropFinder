import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} className="property-card__img" />
      <div className="property-card__info">
        <h2>{property.title}</h2>
        <p>{property.location}</p>
        <p className="property-card__price">${property.price}</p>
        <button className="raise">Contactar agente</button>
      </div>
    </div>
  );
};

export default PropertyCard;
