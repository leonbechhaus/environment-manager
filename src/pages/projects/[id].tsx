import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Grid, TextField, Box, Separator, IconButton } from "@radix-ui/themes";
import JSONInput from "react-json-editor-ajrm";
import { useEffect, useState } from "react";
import { jsonEditorEnLocale } from "~/utils/jsonEditorConstants";
import { ReloadIcon } from "@radix-ui/react-icons";
import SaveEntryButton from "~/components/SaveEntryButton";
import { AnimatePresence, motion } from "framer-motion";

import {
  type ExtraModule,
  type GruntTask,
  type Module,
  type RootProject,
} from "~/types/projects-interface";

type RootProjectTextInputs = {
  name: string;
  branch: string;
  develop_server: string;
  develop_url: string;
  develop_user: string;
  environment: string;
  live_migrations: string;
  project_number: string;
  theme: string;
};

type RootProjectEditors = {
  extraModules: ExtraModule[];
  grunt_tasks: GruntTask[];
  modules: Module[];
  child_themes: string[];
};

export default function List() {
  const router = useRouter();
  const [project, setProject] = useState<RootProject | null>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const { id } = router.query;
  const trpc = api.projects.getSpecificData.useQuery(id as string);
  const { data } = trpc;

  useEffect(() => {
    if (data) {
      setProject(data);
    }
  }, [data]);

  const itemKeys = Object.keys(data ?? {});

  const textInputItems = itemKeys.filter((key) => {
    return (
      key !== "modules" &&
      key !== "dependencies" &&
      key !== "environments" &&
      key !== "oxid" &&
      key !== "_id" &&
      key !== "child_themes" &&
      key !== "versions"
    );
  });

  const editorItems = itemKeys.filter((key) => {
    return (
      key === "modules" ||
      key === "dependencies" ||
      key === "environments" ||
      key === "oxid" ||
      key === "child_themes"
    );
  });

  const onTextInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const value = e.target.value;

    setProject((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [key]: value,
        };
      } else {
        return null;
      }
    });

    setIsUpdated(true);
  };

  const resetInputValue = (key: string) => {
    setProject((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [key as keyof RootProjectTextInputs]:
            data![key as keyof RootProjectTextInputs],
        };
      } else {
        return null;
      }
    });
  };

  return (
    <Layout showHeader>
      <AnimatePresence mode="wait">
        {!trpc.isFetching && project ? (
          <motion.div
            key="project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {" "}
            <Grid gap="4" columns="3" align="center" width={"100%"}>
              {textInputItems.map((key) => (
                <Box key={key} width="auto">
                  <label className="flex text-xs text-gray-200/70">{key}</label>
                  <TextField.Root>
                    <TextField.Input
                      id={key}
                      size="3"
                      placeholder={key}
                      value={project[key as keyof RootProjectTextInputs] ?? ""}
                      onChange={(e) => onTextInputChange(e, key)}
                    />
                    <TextField.Slot pr="3">
                      <IconButton
                        size="2"
                        variant="ghost"
                        onClick={() => resetInputValue(key)}
                      >
                        <ReloadIcon height="16" width="16" />
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>
                </Box>
              ))}
            </Grid>
            <Separator my="4" size="4" />
            <Grid gap="4" columns="2" align="center">
              {editorItems.map((key) => (
                <Box key={key} width="auto">
                  <label className="flex text-xs text-gray-200/70">{key}</label>

                  <JSONInput
                    key={key}
                    theme={"dark_vscode_tribute"}
                    height="250px"
                    width="100%"
                    placeholder={project[key as keyof RootProjectEditors]}
                    locale={jsonEditorEnLocale}
                    waitAfterKeyPress={2000}
                  />
                </Box>
              ))}
            </Grid>
            {isUpdated && (
              <SaveEntryButton onSave={() => console.log("saved")} />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="project_loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: "ease" },
            }}
          >
            {" "}
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                Loading project data...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
