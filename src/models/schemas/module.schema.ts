const ModulesSchema = {
  default_branch: {
    type: String,
    required: true,
  },
  dependencies: {
    depends_on: {
      type: [String],
      required: false,
    },
    dependend_by: {
      type: [String],
      required: false,
    },
  },
  environments: {
    name: {
      type: String,
    },
    branch: {
      type: String,
    },
    latestVersion: {
      type: String,
    },
  },
  jira_key: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  oxid: {
    supported_themes: {
      type: [String],
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  project_number: {
    type: String,
    required: true,
  },
  short_name: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  versions: [
    {
      version: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      created_at: {
        type: String,
        required: true,
      },
      created_by: {
        type: String,
        required: true,
      },
      environments: {
        type: [String],
        required: true,
      },
      dependencies: {
        depends_on: {
          type: [String],
          required: false,
        },
        dependend_by: {
          type: [String],
          required: false,
        },
      },
    },
  ],
  repo: {
    type: String,
    required: true,
  },
};

export default ModulesSchema;
