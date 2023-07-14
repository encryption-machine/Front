import React from 'react';
import SvgSelector from '../../SvgSelector/SvgSelector';
import CheckMark from '../../CheckMark/CheckMark';
import styles from './AccordionItem.module.scss';

export default function AccordionItem({
  id,
  name,
  description,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
}) {
  const toggleAccordionItem = () => {
    const openIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(openIndex);
  };
  return (
    <li
      className={styles.accordionItem_ciphers}
      key={id}
      onClick={toggleAccordionItem}
    >
      <div className={styles.accordionItem_cipher}>
        <div className={styles.accordionItem_svg}>
          <SvgSelector name={name} />
        </div>
        <h3 className={styles.accordionItem_name}>{name}</h3>
        <div className={styles.accordionItem_svg}>
          <CheckMark />
        </div>
      </div>
      {isActiveSection ? (
        <p className={styles.accordionItem_description_show}>{description}</p>
      ) : (
        <p className={styles.accordionItem_description}>{description}</p>
      )}
    </li>
  );
}
