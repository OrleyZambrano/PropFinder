import React from 'react';
import PropertyCard from './PropertyCard';
import './PropertyList.css';

const PropertyList = ({ title, properties }) => (
  <section className="property-list">
    <h2>{title}</h2>
    <div className="property-list__row">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  </section>
);

export default PropertyList;
