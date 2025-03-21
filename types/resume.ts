export interface ResumeContent {
  header?: {
    firstName?: string;
    lastName?: string;
    title?: string;
  };
  summary?: {
    title?: string;
    description?: string;
    specialties?: Array<{
      title?: string;
      description?: string;
    }>;
  };
  contact?: Array<{
    icon?: string;
    text?: string;
  }>;
  languages?: Array<{
    language?: string;
    proficiency?: string;
  }>;
  skills?: Array<{
    title?: string;
    color?: string;
    items?: string[];
  }>;
  education?: Array<{
    title?: string;
    institution?: string;
    date?: string;
    location?: string;
  }>;
  academicExperiences?: Array<{
    title?: string;
    institution?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    description?: Array<string>;
    sections?: Array<{
      title?: string;
      intro?: string;
      items?: string[];
    }>;
    stack?: string[];
  }>;
  projects?: Array<{
    title?: string;
    type?: 'profesionnal' | 'freelance';
    company?: string;
    client?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    sections?: Array<{
      title?: string;
      intro?: string;
      items?: string[];
    }>;
    stack?: string[];
  }>;
  publication?: Array<{
    title?: string;
    authors?: string;
    journal?: string;
    year?: number;
    volume?: string;
    number?: string;
    pages?: string;
  }>;
}
