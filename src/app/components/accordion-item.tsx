import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface AccordionItemProps {
  key: string;
  title: string;
  id: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ key, title, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4" key={key}>
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl mb-2">{title}</h2>
        <ChevronDownIcon
          className={`h-6 w-6 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div id={id} style={{ display: isOpen ? "block" : "none" }}></div>
    </div>
  );
};

export default AccordionItem;
