import React, { useState } from 'react';
import ProjectsContext, {
	ProjectsContextModel,
	Project,
	ProjectType,
} from './projects-context';

const ProjectsContextProvider: React.FC = (props) => {

	const [projects, setProjects] = useState<Project[]>([
		{
			id: Math.random().toString(),
			title: 'Portfolio Website',
			description: 'Fix SSR and improve lighthouse score',
			time: '9:00',
			projectType: 'angular',
			imageUrl: '/assets/images/angular.jpg',
			isFinished: false
		},
		{
			id: Math.random().toString(),
			title: 'Full-Stack Site',
			description: 'Connect backend and test',
			time: '14:00',
			projectType: 'mern',
			imageUrl: '/assets/images/mern.jpg',
			isFinished: false
		},
		{
			id: Math.random().toString(),
			title: 'Calculator',
			description: 'Complete tutorial',
			time: '11:00',
			projectType: 'vue',
			imageUrl: '/assets/images/vue.jpg',
			isFinished: false
		},
	]);

	const addProject = (
		title: string,
		description: string,
		time: string,
		projectType: ProjectType
	) => {
		let imageUrl = '';
		switch(projectType) {
			case 'angular':
				imageUrl = '/assets/images/angular.jpg';
				break;
			case 'vue':
				imageUrl = '/assets/images/vue.jpg';
				break;
			case 'mern':
				imageUrl = '/assets/images/mern.jpg';
				break;
			default:
				imageUrl = '/assets/images/angular.jpg';
				break;
		}

		// const projectDate = new Date();
		// const time = projectDate.getHours() + ':' + projectDate.getMinutes();

		const addProject: Project = {
			id: Math.random().toString(),
			title,
			description,
			time,
			projectType,
			imageUrl,
			isFinished: false
		};

		setProjects((currentProjects) => {
			return [...currentProjects, addProject];
		});
	};

	const finishedProject = (projectId: string) => {
		setProjects((currentProjects) => {
			const updatedProjects = [...currentProjects];
			const chosenProjectIndex = projects.findIndex(
				(proj) => proj.id === projectId
			);
			const updatedProject = {
				...updatedProjects[chosenProjectIndex],
				isFinished: true,
			};
			updatedProjects[chosenProjectIndex] = updatedProject;
			return updatedProjects;
		});
	};

	const projectsContext: ProjectsContextModel = {
		projects,
		addProject,
		finishedProject
	};

	return (
		<ProjectsContext.Provider value={projectsContext}>
			{props.children}
		</ProjectsContext.Provider>
	);
};

export default ProjectsContextProvider;
