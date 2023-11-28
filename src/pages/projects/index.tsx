import { api } from "~/utils/api";
import ListItem from "~/components/ListItem";
import Layout from "~/components/Layout";
import CreateEntryButton from "~/components/CreateEntryButton";
import SearchPortal from "~/components/SearchPortal";
import { useState, useEffect } from "react";
import { type RootProject } from "~/types/projects-interface";
import { type RootModule } from "~/types/modules-interface";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";

export default function ProjectsPage() {
  const [searchResults, setSearchResults] = useState<
    RootModule[] | RootProject[] | []
  >([]);
  const trpc = api.projects.getData.useQuery();
  const { data } = trpc;

  useEffect(() => {
    if (data) {
      setSearchResults(data);
    }
  }, [data]);

  return (
    <Layout showHeader>
      <AnimatePresence mode="wait">
        {data && !trpc.isFetching && (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {" "}
            <SearchPortal entries={data} setSearchResults={setSearchResults} />
            {searchResults?.length ? (
              searchResults.map(
                (result: RootProject | RootModule, key: number) => (
                  <div key={result._id}>
                    <ListItem index={key} data={searchResults} />
                  </div>
                ),
              )
            ) : (
              <Flex align="center" justify="center" my="9" direction="column">
                <CircleBackslashIcon height="96" width="96" />

                <Text my="6">
                  <Heading as="h2" size="6">
                    No results found
                  </Heading>
                </Text>
              </Flex>
            )}
            <CreateEntryButton path="projects" />
          </motion.div>
        )}
        {trpc.isFetching && (
          <motion.div
            key="projects_loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: "ease" },
            }}
          >
            <Flex align="center" justify="center" my="9" direction="column">
              <Text my="6">
                <Heading as="h2" size="6">
                  Loading...
                </Heading>
              </Text>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
