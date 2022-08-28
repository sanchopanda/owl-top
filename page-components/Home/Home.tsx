
import styles from './Home.module.css';
import { Htag, Paragraph } from '../../components/index';

export const Home = () => {
	return (
		<div className={styles.wrapper}>
			<div>
				<Htag className={styles.title} tag="h1">
					Лучший агрегатор онлайн курсов
				</Htag>
				<Paragraph size="large">
					Подборки лучших курсов и рейтинги, основанные на реальных отзывах.
				</Paragraph>
			</div>
		</div>
	);
};

