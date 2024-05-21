import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArrowButton } from './components/arrow-button';
import { Text } from './components/text';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type TDataState = {
	font: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

const App = () => {
	const [isOpen, setStateIsOpen] = useState<boolean>(false);
	const [dataForm, setDataForm] = useState<TDataState>({
		font: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	});
	const [dataPage, setDataPage] = useState<TDataState>({
		font: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});
	const panelRef = useRef<HTMLElement | null>(null);
	const arrowRef = useRef<HTMLDivElement | null>(null);

	const handleTogglePanel = (e: React.BaseSyntheticEvent | MouseEvent) => {
		e.stopPropagation();
		if (!isOpen) setStateIsOpen(true);
		else setStateIsOpen(false);
	};

	const handleClosePanelWithOverlay = (
		e: React.BaseSyntheticEvent | MouseEvent
	) => {
		if (
			isOpen &&
			panelRef.current &&
			arrowRef.current &&
			!panelRef.current.contains(e.target) &&
			!arrowRef.current.contains(e.target)
		) {
			setStateIsOpen(false);
		}
	};

	const handleOnChange = (data: OptionType, name: string) => {
		setDataForm({
			...dataForm,
			[name]: data,
		});
	};

	const handleOnSubmit = (e: React.BaseSyntheticEvent | SubmitEvent) => {
		e.preventDefault();
		setDataPage({
			...dataPage,
			font: dataForm.font,
			fontSize: dataForm.fontSize,
			fontColor: dataForm.fontColor,
			backgroundColor: dataForm.backgroundColor,
			contentWidth: dataForm.contentWidth,
		});
	};

	const handleOnReset = (e: React.BaseSyntheticEvent | Event) => {
		e.preventDefault();
		setDataForm({
			...dataForm,
			font: fontFamilyOptions[0],
			fontSize: fontSizeOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
		});
		setDataPage({
			...dataPage,
			font: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClosePanelWithOverlay);
		return () =>
			document.removeEventListener('mousedown', handleClosePanelWithOverlay);
	});

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': dataPage.font.value,
					'--font-size': dataPage.fontSize.value,
					'--font-color': dataPage.fontColor.value,
					'--container-width': dataPage.contentWidth.value,
					'--bg-color': dataPage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm>
				{{
					isOpen,
					handleOnSubmit,
					handleOnReset,
					panelRef,
					arrowButton: (
						<ArrowButton
							isOpen={isOpen}
							handler={handleTogglePanel}
							arrowRef={arrowRef}
						/>
					),
					title: (
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					),
					fontSelect: (
						<Select
							selected={dataForm.font}
							options={fontFamilyOptions}
							placeholder={fontFamilyOptions[0].title}
							onChange={(data) => handleOnChange(data, 'font')}
							title='Шрифт'
						/>
					),
					fontSizeRadio: (
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={dataForm.fontSize}
							onChange={(data) => handleOnChange(data, 'fontSize')}
							title='Размер шрифта'
						/>
					),
					fontColorSelect: (
						<Select
							selected={dataForm.fontColor}
							options={fontColors}
							placeholder={fontColors[0].title}
							onChange={(data) => handleOnChange(data, 'fontColor')}
							title='Цвет шрифта'
						/>
					),
					backgroundColorSelect: (
						<Select
							selected={dataForm.backgroundColor}
							options={backgroundColors}
							placeholder={backgroundColors[0].title}
							onChange={(data) => handleOnChange(data, 'backgroundColor')}
							title='Цвет фона'
						/>
					),
					contentWidthSelect: (
						<Select
							selected={dataForm.contentWidth}
							options={contentWidthArr}
							placeholder={contentWidthArr[0].title}
							onChange={(data) => handleOnChange(data, 'contentWidth')}
							title='Ширина контента'
						/>
					),
				}}
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
