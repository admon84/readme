// GitHub API Types
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  archived: boolean;
  fork: boolean;
}

export interface RepositoryDetail extends Repository {
  clone_url: string;
  ssh_url: string;
  git_url: string;
  size: number;
  watchers_count: number;
  open_issues_count: number;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  } | null;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubApiError {
  message: string;
  documentation_url: string;
  status: number;
}

export interface GitHubServiceConfig {
  username: string;
  token?: string;
  baseUrl?: string;
}
