import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Grid, TextField, Box, Separator, IconButton } from "@radix-ui/themes";
import {
  type Dependencies,
  type Environment,
  type Oxid,
  type Version,
  type RootModule,
} from "~/types/modules-interface";
import JSONInput from "react-json-editor-ajrm";
import { useEffect, useState } from "react";
import { jsonEditorEnLocale } from "~/utils/jsonEditorConstants";
import { ReloadIcon } from "@radix-ui/react-icons";
import SaveEntryButton from "~/components/SaveEntryButton";
import { AnimatePresence, motion } from "framer-motion";

type RootModuleTextInputs = {
  default_branch: string;
  jira_key: string;
  name: string;
  project_number: string;
  short_name: string;
  version: string;
  repo: string;
};

type RootModuleEditors = {
  dependencies: Dependencies;
  environments: Environment[];
  oxid: Oxid;
  versions: Version[];
};

export default function List() {
  const router = useRouter();
  const [module, setModule] = useState<RootModule | null>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const { id } = router.query;
  const trpc = api.modules.getSpecificData.useQuery(id as string);
  const { data } = trpc;

  useEffect(() => {
    if (data) {
      setModule(data);
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

    setModule((prevState) => {
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
    setModule((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [key as keyof RootModuleTextInputs]:
            data![key as keyof RootModuleTextInputs],
        };
      } else {
        return null;
      }
    });
  };

  return (
    <Layout showHeader>
      <AnimatePresence mode="wait">
        {!trpc.isFetching && module ? (
          <motion.div
            key="module"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Grid gap="4" columns="3" align="center" width={"100%"}>
              {textInputItems.map((key) => (
                <Box key={key} width="auto">
                  <label className="flex text-xs text-gray-200/70">{key}</label>
                  <TextField.Root>
                    <TextField.Input
                      id={key}
                      size="3"
                      placeholder={key}
                      value={module[key as keyof RootModuleTextInputs]}
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
                    placeholder={module[key as keyof RootModuleEditors]}
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
            key="module_loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: "ease" },
            }}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                Loading module data...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
