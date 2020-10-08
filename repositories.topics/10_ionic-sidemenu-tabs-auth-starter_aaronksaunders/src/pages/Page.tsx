import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
} from '@ionic/react';
import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useAuth } from '../pages/auth/authContext';

import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Page: React.FC = () => {
	const { name } = useParams<{ name: string }>();
	let { logOut } = useAuth()!;
	const history = useHistory();

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{name}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<ExploreContainer name={name} />
				<IonButton
					onClick={async () => {
						await logOut();
						history.replace('/login');
					}}
				>
					LOGOUT
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Page;
