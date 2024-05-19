import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArrowButton } from './components/arrow-button';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setStateIsOpen] = useState<boolean>(false);
	const panelRef = useRef<HTMLElement | null>(null);
	const arrowRef = useRef<HTMLDivElement | null>(null);

	function handleTogglePanel(e: React.BaseSyntheticEvent | MouseEvent) {
		e.stopPropagation();
		if (!isOpen) setStateIsOpen(true);
		else setStateIsOpen(false);
	}

	function handleClosePanelWithOverlay(
		e: React.BaseSyntheticEvent | MouseEvent
	) {
		e.target;
		if (
			isOpen &&
			panelRef.current &&
			arrowRef.current &&
			!panelRef.current.contains(e.target) &&
			!arrowRef.current.contains(e.target)
		) {
			setStateIsOpen(false);
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClosePanelWithOverlay);
		return () =>
			document.removeEventListener('mousedown', handleClosePanelWithOverlay);
	}, [isOpen]);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm>
				{{
					isOpen,
					arrowButton: (
						<ArrowButton>
							{{
								isOpen,
								handler: handleTogglePanel,
								arrowRef,
							}}
						</ArrowButton>
					),
					panelRef,
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
