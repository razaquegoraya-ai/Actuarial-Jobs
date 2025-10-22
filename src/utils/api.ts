import { Job, JobFormData } from '../types/Job';

const API_BASE_URL = '/api';

export async function fetchJobs(params?: {
  keyword?: string;
  job_type?: string;
  location?: string;
  tags?: string[];
  sort?: string;
}): Promise<Job[]> {
  const queryParams = new URLSearchParams();

  if (params?.keyword) queryParams.append('keyword', params.keyword);
  if (params?.job_type && params.job_type !== 'All') queryParams.append('job_type', params.job_type);
  if (params?.location && params.location !== 'All') queryParams.append('location', params.location);
  if (params?.tags && params.tags.length > 0) {
    params.tags.forEach(tag => queryParams.append('tag', tag));
  }
  if (params?.sort) queryParams.append('sort', params.sort);

  const url = `${API_BASE_URL}/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }

  return response.json();
}

export async function createJob(jobData: JobFormData): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...jobData,
      tags: jobData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Failed to create job');
  }

  return response.json();
}

export async function updateJob(id: string, jobData: JobFormData): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...jobData,
      tags: jobData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Failed to update job');
  }

  return response.json();
}

export async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete job: ${response.statusText}`);
  }
}
