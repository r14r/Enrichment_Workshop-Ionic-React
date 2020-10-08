import React from 'react';
import {
	IonApp,
	IonRouterOutlet,
	IonMenu,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonIcon,
	IonLabel,
	IonMenuToggle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Route, Redirect } from 'react-router-dom';
import AllProjects from './pages/AllProjects/AllProjects';
import AddProject from './pages/AddProject/AddProject';
import { documentsOutline, addCircleOutline } from 'ionicons/icons';
import ProjectsContextProvider from './data/ProjectsContextProvider';

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonMenu side="start" contentId="projectAppM1">
				<IonHeader>
					<IonToolbar color="tertiary">
						<IonTitle>App Planner</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonList>
						<IonMenuToggle>
							<IonItem
								routerLink="/all-projects"
								routerDirection="none"
								lines="none"
							>
								<IonIcon color="dark" slot="start" icon={documentsOutline} />
								<IonLabel>Projects List</IonLabel>
							</IonItem>
						</IonMenuToggle>
						<IonMenuToggle>
							<IonItem
								routerLink="/add-project"
								routerDirection="none"
								lines="none"
							>
								<IonIcon color="dark" slot="start" icon={addCircleOutline} />
								<IonLabel>Add Project</IonLabel>
							</IonItem>
						</IonMenuToggle>
					</IonList>
				</IonContent>
			</IonMenu>
			<ProjectsContextProvider>
				<IonRouterOutlet id="projectAppM1">
					<Route path="/all-projects" component={AllProjects} exact />
					<Route path="/add-project" component={AddProject} exact />
					<Redirect to="/all-projects" />
				</IonRouterOutlet>
			</ProjectsContextProvider>
		</IonReactRouter>
	</IonApp>
);

export default App;
