export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  posting_date: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  tags: string[];
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  posting_date: string;
  job_type: string;
  tags: string;
}

export interface FilterOptions {
  keyword: string;
  job_type: string;
  location: string;
  tags: string[];
  sort: 'date_desc' | 'date_asc';
}
