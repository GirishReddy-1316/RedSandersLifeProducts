import React, { useState } from 'react';
import downArrow from "../assets/arrowDown.png";
import upArrow from "../assets/arrowUp.png";

import "../styles/accordion.css";

function AccordionItem({ title, description }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <h3 className={`accordion-header ${isOpen ? 'active' : ''}`} onClick={toggleAccordion}>
        {title}       
        {isOpen ? <img src={upArrow} alt="Arrow Up" className='arrows'/> : <img src={downArrow} alt="Arrow Down" className='arrows'/> } 
      </h3>
      {isOpen && (
        <div className="accordion-content">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

function Accordion({ items }) {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} description={item.description} />
      ))}
    </div>
  );
}

export default Accordion;
