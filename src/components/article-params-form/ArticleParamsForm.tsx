import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { LegacyRef } from 'react';

type TArticleParamsFormProps = {
	children: {
		isOpen: boolean;
		arrowButton: React.ReactNode;
		panelRef: LegacyRef<HTMLElement> | null;
	};
};

export const ArticleParamsForm = ({ children }: TArticleParamsFormProps) => {
	const { isOpen, arrowButton, panelRef } = children;

	return (
		<>
			{arrowButton}
			<aside
				ref={panelRef}
				className={
					isOpen
						? styles.container + ' ' + styles.container_open
						: styles.container
				}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
