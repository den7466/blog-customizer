import { CSSProperties, useState } from 'react';
import styles from './App.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [dataPage, setDataPage] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': dataPage.fontFamilyOption.value,
					'--font-size': dataPage.fontSizeOption.value,
					'--font-color': dataPage.fontColor.value,
					'--container-width': dataPage.contentWidth.value,
					'--bg-color': dataPage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setDataPage={setDataPage} />
			<Article />
		</div>
	);
};
