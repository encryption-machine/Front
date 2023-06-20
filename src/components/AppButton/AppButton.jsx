import React from 'react';
import styles from './AppButton.module.scss';

export const AppButton = ({ typeClass, action, children, isButtonDisabled }) => {
	const buttonClass =
		typeClass === 'secondary'
			? `${styles.appButton__secondary} ${styles.appButton}`
			: typeClass === 'outlined'
			? `${styles.appButton__outlined} ${styles.appButton}`
			: styles.appButton;

	return (
		<button
			disabled={isButtonDisabled}
			onClick={action}
			className={buttonClass}
		>
			{children}
		</button>
	);
};
