import { useState } from 'react';
import './ProductoCard.css';

const ProductoCard = ({ nombre, precio, imagen }) => {
  // Estado para saber si la tarjeta está girada o no
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container mb-4" onClick={handleFlip}>
      <div className={`card-flip ${isFlipped ? 'is-flipped' : ''}`}>
        
        {/* Lado Frontal de la Tarjeta */}
        <div className="card-front">
          <img src={imagen} alt={nombre} className="product-img" />
          <div className="p-3 text-center">
            <h6 className="mb-0 fw-bold">{nombre}</h6>
          </div>
        </div>

        {/* Lado Trasero de la Tarjeta (Modo 100% Informativo) */}
        <div className="card-back text-center px-3">
          <h2 className="fw-bold">S/ {precio}</h2>
          
          {/* Mensaje informativo en lugar de botón */}
          <p className="mt-3 mb-0 text-white" style={{ fontSize: '0.9rem' }}>
            Visítanos para adquirir este producto.
          </p>
          
          <span className="badge bg-light text-danger mt-3 p-2 shadow-sm">
                 Disponible en Tienda
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProductoCard;