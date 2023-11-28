import { type Document } from "mongoose";

interface Module {
  name: string;
  project_number: string;
  version: string;
  history: string[];
}

interface ExtraModule {
  name: string;
  migrate: boolean;
  autoactivate: boolean;
}

interface GruntTask {
  name: string;
  version: string;
  autoInstall: boolean;
  autoInstall_path: string;
}

interface ProjectDoc extends Document {
  _id?: string;
  branch: string;
  child_themes?: string[] | null;
  develop_server: string;
  develop_url: string;
  develop_user: string;
  environment: string;
  extraModules?: ExtraModule[] | null;
  grunt_tasks?: GruntTask[] | null;
  live_migrations: string;
  modules?: Module[] | null;
  name: string;
  project_number: string;
  theme: string;
}

interface RootProject {
  _id?: string;
  branch: string;
  child_themes?: string[] | null;
  develop_server: string;
  develop_url: string;
  develop_user: string;
  environment: string;
  extraModules?: ExtraModule[] | null;
  grunt_tasks?: GruntTask[] | null;
  live_migrations: string;
  modules?: Module[] | null;
  name: string;
  project_number: string;
  theme: string;
  short_name: string;
}

export type { Module, ExtraModule, GruntTask, ProjectDoc, RootProject };
