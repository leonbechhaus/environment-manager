import { Schema, type Model, model, models } from "mongoose";
import { type RootModule, type ModuleDoc } from "~/types/modules-interface";
import ModulesSchema from "./schemas/module.schema";

interface ModuleModel extends Model<RootModule> {
  build(attr: RootModule): ModuleDoc;
}

const modulesSchema = new Schema<RootModule, Model<RootModule>>({
  ...ModulesSchema,
});

const existingModule: Model<RootModule> | [] | undefined = models.Module;

const Module = () =>
  existingModule ?? model<RootModule, ModuleModel>("Module", modulesSchema);

export default Module;
