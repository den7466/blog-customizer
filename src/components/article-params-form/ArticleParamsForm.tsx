import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { LegacyRef, ReactEventHandler } from 'react';
import { Separator } from '../separator';
import clsx from 'clsx';

type TArticleParamsFormProps = {
	children: {
		isOpen: boolean;
		handleOnSubmit: ReactEventHandler;
		handleOnReset: ReactEventHandler;
		panelRef: LegacyRef<HTMLElement> | null;
		arrowButton: React.ReactNode;
		title: React.ReactNode;
		fontSelect: React.ReactNode;
		fontSizeRadio: React.ReactNode;
		fontColorSelect: React.ReactNode;
		backgroundColorSelect: React.ReactNode;
		contentWidthSelect: React.ReactNode;
	};
};

export const ArticleParamsForm = ({ children }: TArticleParamsFormProps) => {
	const {
		isOpen,
		handleOnSubmit,
		handleOnReset,
		panelRef,
		arrowButton,
		title,
		fontSelect,
		fontSizeRadio,
		fontColorSelect,
		backgroundColorSelect,
		contentWidthSelect,
	} = children;

	return (
		<>
			{arrowButton}
			<aside
				ref={panelRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleOnSubmit}
					onReset={handleOnReset}>
					{title}
					{fontSelect}
					{fontSizeRadio}
					{fontColorSelect}
					<Separator />
					{backgroundColorSelect}
					{contentWidthSelect}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
