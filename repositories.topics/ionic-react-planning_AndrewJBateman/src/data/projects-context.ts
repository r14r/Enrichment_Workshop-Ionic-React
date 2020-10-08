import React from 'react';

export type ProjectType = 'angular' | 'vue' | 'mern';

export interface Project {
	id: string;
	title: string;
	description: string;
	time: string;
	projectType: ProjectType;
	imageUrl: string;
	isFinished: boolean;
}

export interface ProjectsContextModel {
	projects: Project[];
	addProject: (
		title: string,
		description: string,
		time: string,
		projectType: ProjectType
	) => void;
	finishedProject: (projectId: string) => void;
}

const ProjectsContext = React.createContext<ProjectsContextModel>({
	projects: [],
	addProject: () => {},
	finishedProject: () => {}
});

export default ProjectsContext;
