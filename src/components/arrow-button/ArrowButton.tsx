import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { LegacyRef } from 'react';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButton = {
	isOpen: boolean;
	handler: React.MouseEventHandler;
	arrowRef: LegacyRef<HTMLDivElement> | null;
};

export const ArrowButton = ({ isOpen, handler, arrowRef }: TArrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			ref={arrowRef}
			onClick={handler}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: isOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrow_open]: isOpen,
				})}
			/>
		</div>
	);
};
