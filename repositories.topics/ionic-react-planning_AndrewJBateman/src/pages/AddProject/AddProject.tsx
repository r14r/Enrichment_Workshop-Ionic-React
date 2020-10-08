import React, { useRef, useContext, useState } from 'react';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonRow,
	IonGrid,
	IonCol,
	IonButtons,
	IonMenuButton,
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonInput,
	IonDatetime,
	IonButton,
	IonToast,
	IonIcon,
} from '@ionic/react';
import { addOutline, closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import ProjectsContext, { ProjectType } from '../../data/projects-context';

const AddProject: React.FC = () => {
	const history = useHistory();
	const projectsCtxt = useContext(ProjectsContext);

	const titleInput = useRef<HTMLIonInputElement>(null);
	const descriptionInput = useRef<HTMLIonInputElement>(null);
	const projectTypeInput = useRef<HTMLIonSegmentElement>(null);
	const timeInput = useRef<HTMLIonDatetimeElement>(null);

	const [toastMsg, setToastMsg] = useState<string>('');

	const addProject = () => {
		const title = titleInput.current?.value as string;
		const description = descriptionInput.current?.value as string;
		const projectType = projectTypeInput.current?.value as ProjectType;
		const startDate = new Date(timeInput.current?.value as string);
		const startTime = startDate.getHours() + ':' + startDate.getMinutes();

		if (title && description && projectType && startTime) {
			projectsCtxt.addProject(title, description, startTime, projectType);
			setToastMsg('The project was saved');
			history.replace('/all-projects');
		}
	};

	return (
		<React.Fragment>
			<IonToast
				isOpen={!!toastMsg}
				message={toastMsg}
				duration={4000}
				color="medium"
				onDidDismiss={() => setToastMsg('')}
			/>

			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton />
						</IonButtons>
						<IonTitle>Add Project</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonGrid>
						<IonRow>
							<IonCol className="ion-text-center">
								<IonSegment color="tertiary" ref={projectTypeInput}>
									<IonSegmentButton value="angular">
										<IonLabel>Angular</IonLabel>
									</IonSegmentButton>
									<IonSegmentButton value="mern">
										<IonLabel>MERN</IonLabel>
									</IonSegmentButton>
									<IonSegmentButton value="vue">
										<IonLabel>Vue</IonLabel>
									</IonSegmentButton>
								</IonSegment>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonLabel position="floating">Project Title</IonLabel>
								<IonInput
									required
									ref={titleInput}
									type="text"
									min="4"
									max="50"
									placeholder="Enter at least 4 characters"
								></IonInput>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonLabel position="floating">Project Description</IonLabel>
								<IonInput
									required
									ref={descriptionInput}
									type="text"
									min="6"
									max="200"
									placeholder="Enter at least 6 characters"
								></IonInput>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonLabel position="floating">Start Time</IonLabel>
								<IonDatetime
									ref={timeInput}
									display-format="h:mm A"
									picker-format="h:mm A"
									value={new Date().toISOString()}
								/>
							</IonCol>
						</IonRow>
						{/* <IonRow className=""> */}
						{/* <IonCol className="ion-text-center ion-margin-top"> */}
						<IonButton color="success" onClick={addProject}>
							<IonIcon icon={addOutline} />
						</IonButton>
						<IonButton color="danger" routerLink="/all-projects">
							<IonIcon icon={closeOutline} />
						</IonButton>
						{/* </IonCol> */}
						{/* </IonRow> */}
					</IonGrid>
				</IonContent>
			</IonPage>
		</React.Fragment>
	);
};

export default AddProject;
