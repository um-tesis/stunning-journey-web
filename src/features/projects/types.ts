import {Dayjs} from 'dayjs';

export type Project = {
  id: number;
  name: string;
  description: string;
  field: string;
  organizationId: number;
  startDate?: Dayjs;
  acceptsVolunteers?: boolean;
  coverPhoto?: string;
  video?: string;
  photoGallery?: string[];
  location?: string;
};

export type ProjectOut = Omit<Project, 'id'>;

export type VolunteersEmail = {
  projectId: number;
  subject: string;
  body: string;
};

export type ProjectHours = {
  projectId: number;
  userId: number;
  hours: number;
};
