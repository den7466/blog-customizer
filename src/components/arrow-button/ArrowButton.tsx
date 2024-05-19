import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { LegacyRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButton = {
	children: {
		isOpen: boolean;
		handler: React.MouseEventHandler;
		arrowRef: LegacyRef<HTMLDivElement> | null;
	};
};

export const ArrowButton = ({ children }: TArrowButton) => {
	const { isOpen, handler, arrowRef } = children;

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			ref={arrowRef}
			onClick={handler}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={
				isOpen
					? styles.container + ' ' + styles.container_open
					: styles.container
			}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={
					isOpen ? styles.arrow + ' ' + styles.arrow_open : styles.arrow
				}
			/>
		</div>
	);
};
