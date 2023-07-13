import React, { useState } from 'react';
import styles from './Accordion.module.scss';
import AccordionItem from './AccordionItem/AccordionItem';

export default function Accordion({ ciphersInfo }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <ul className={styles.accordion}>
      {ciphersInfo.map(({ id, name, description }) => (
        <AccordionItem
          key={id}
          name={name}
          description={description}
          isActiveSection={id === activeIndex}
          setActiveIndex={setActiveIndex}
          sectionIndex={id}
        />
      ))}
    </ul>
  );
}
