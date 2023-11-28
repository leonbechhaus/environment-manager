import { type Document } from "mongoose";

interface Dependencies {
  depends_on: string[] | null;
  dependend_by: string[] | null;
}

interface Environment {
  name: string;
  branch: string;
  latestVersion: string;
}

interface Oxid {
  supported_themes: string[];
}

interface Version {
  version: string;
  message: string;
  created_at: string;
  created_by: string;
  environments: string[];
  dependencies: Dependencies;
}

interface ModuleDoc extends Document {
  _id?: string;
  default_branch: string;
  dependencies: Dependencies;
  environments: Environment[];
  jira_key: string;
  name: string;
  oxid: Oxid;
  price: number;
  project_number: string;
  short_name: string;
  version: string;
  versions: Version[];
  repo: string;
}

interface RootModule {
  _id?: string;
  default_branch: string;
  dependencies: Dependencies;
  environments: Environment[];
  jira_key: string;
  name: string;
  oxid: Oxid | null;
  price: number;
  project_number: string;
  short_name: string;
  version: string;
  versions: Version[];
  repo: string;
}

export type { Dependencies, Environment, Oxid, Version, ModuleDoc, RootModule };
