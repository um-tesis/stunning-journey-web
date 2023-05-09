export type Project = {
  id: number;
  name: string;
  description: string;
  field: string;
  organizationId: number;
  startDate?: string;
  endDate?: string;
  acceptsVolunteers?: boolean;
  coverPhoto?: string;
  video?: string;
  photoGallery?: string[];
  location?: string;
};

export type ProjectOut = Omit<Project, 'id'>;
