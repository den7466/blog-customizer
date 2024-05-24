import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Separator } from '../separator';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { ArrowButton } from '../arrow-button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

type TArticleParamsFormProps = {
	setDataPage: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setDataPage }: TArticleParamsFormProps) => {
	const [isOpen, setStateIsOpen] = useState<boolean>(false);
	const [dataForm, setDataForm] =
		useState<ArticleStateType>(defaultArticleState);
	const panelRef = useRef<HTMLElement | null>(null);

	const handleTogglePanel = () => {
		setStateIsOpen(!isOpen);
	};

	const handleClosePanelWithOverlay = (
		e: React.BaseSyntheticEvent | MouseEvent
	) => {
		if (isOpen && panelRef.current && !panelRef.current.contains(e.target)) {
			setStateIsOpen(false);
		}
	};

	const handleOnChange = (data: OptionType, name: string) => {
		setDataForm({
			...dataForm,
			[name]: data,
		});
	};

	const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDataPage(dataForm);
	};

	const handleOnReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDataForm(defaultArticleState);
		setDataPage(defaultArticleState);
	};

	useEffect(() => {
		if (isOpen)
			document.addEventListener('mousedown', handleClosePanelWithOverlay);

		return () =>
			document.removeEventListener('mousedown', handleClosePanelWithOverlay);
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} handler={handleTogglePanel} />
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
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={dataForm.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={defaultArticleState.fontFamilyOption.title}
						onChange={(data) => handleOnChange(data, 'fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={dataForm.fontSizeOption}
						onChange={(data) => handleOnChange(data, 'fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={dataForm.fontColor}
						options={fontColors}
						placeholder={defaultArticleState.fontColor.title}
						onChange={(data) => handleOnChange(data, 'fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={dataForm.backgroundColor}
						options={backgroundColors}
						placeholder={defaultArticleState.backgroundColor.title}
						onChange={(data) => handleOnChange(data, 'backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={dataForm.contentWidth}
						options={contentWidthArr}
						placeholder={defaultArticleState.contentWidth.title}
						onChange={(data) => handleOnChange(data, 'contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
