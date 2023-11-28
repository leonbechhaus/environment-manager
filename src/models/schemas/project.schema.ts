const ProjectSchema = {
  branch: {
    type: String,
    required: true,
  },
  child_themes: {
    type: [String],
    required: false,
  },
  develop_server: {
    type: String,
    required: true,
  },
  develop_url: {
    type: String,
    required: true,
  },
  develop_user: {
    type: String,
    required: true,
  },
  environment: {
    type: String,
    required: true,
  },
  extraModules: {
    required: false,
    name: {
      type: String,
    },
    migrate: {
      type: Boolean,
    },
    autoactivate: {
      type: Boolean,
    },
  },
  grunt_tasks: {
    required: false,
    name: {
      type: String,
    },
    version: {
      type: String,
    },
    autoInstall: {
      type: Boolean,
    },
    autoInstall_path: {
      type: String,
    },
  },
  live_migrations: {
    type: String,
    required: true,
  },
  modules: [
    {
      name: {
        type: String,
      },
      project_number: {
        type: String,
      },
      version: {
        type: String,
      },
      history: {
        type: [String],
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
  project_number: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
};

export default ProjectSchema;
