import React, { useState } from "react";

import "./Accordion.scss";

const Accordion = ({ children, isOpenByDefault }) => {
  const [isOpen, setIsOpen] = useState(!!isOpenByDefault);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article
      className={`message accordion is-dark ${
        isOpen ? "expanded" : "collapsed"
      }`}
    >
      <button
        onClick={toggleOpen}
        className="toggle-accordion-button"
        type="button"
      >
        <div className="message-header">Songs to include in playlist</div>
      </button>

      {isOpen && (
        <div className="message-body accordion-content">{children}</div>
      )}
    </article>
  );
};

export default Accordion;
