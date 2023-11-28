import { Schema, type Model, model, models } from "mongoose";
import { type RootProject, type ProjectDoc } from "~/types/projects-interface";
import ProjectSchema from "./schemas/project.schema";

interface ProjectModel extends Model<RootProject> {
  build(attr: RootProject): ProjectDoc;
}

const projectSchema = new Schema<RootProject, Model<RootProject>>({
  ...ProjectSchema,
});

const existingProject: Model<RootProject> | [] | undefined = models.Project;

const Project = () =>
  existingProject ?? model<RootProject, ProjectModel>("Project", projectSchema);

export default Project;
