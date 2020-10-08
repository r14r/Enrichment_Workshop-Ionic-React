import React, { useContext } from 'react';
import {
	IonContent,
	IonGrid,
	IonRow,
	IonCol,
	IonImg,
	IonText,
	IonButton,
} from '@ionic/react';
import ProjectsContext, { Project } from '../data/projects-context';

interface FinishedModalProps {
	project: Project;
	dismissModal: () => void;
}

const FinishedModal: React.FC<FinishedModalProps> = (props) => {
	const projectsCtxt = useContext(ProjectsContext);

	const confirmFinished = (projectId: string) => {
		projectsCtxt.finishedProject(projectId);
		props.dismissModal();
	};

	return (
		<IonContent>
			<IonGrid className="ion-no-padding">
				<IonRow>
					<IonCol className="ion-no-padding">
						<IonImg src={props.project.imageUrl} />
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol className="ion-text-center">
						<IonText>
							<h2>{props.project.title}</h2>
						</IonText>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol className="ion-text-center ion-no-padding">
						<IonText color="medium">
							<p>Are you sure the project is finished?</p>
						</IonText>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol className="ion-text-center">
						<IonButton color="danger" fill="clear" onClick={props.dismissModal}>
							Cancel
						</IonButton>
					</IonCol>
					<IonCol className="ion-text-center">
						<IonButton color="primary" fill="clear" onClick={() => confirmFinished(props.project.id)}>
							Finished
						</IonButton>
					</IonCol>
				</IonRow>
			</IonGrid>
		</IonContent>
	);
};

export default FinishedModal;
