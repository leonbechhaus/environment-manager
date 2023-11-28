import React, {
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { IconButton, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import * as Portal from "@radix-ui/react-portal";
import { type RootProject } from "~/types/projects-interface";
import { type RootModule } from "~/types/modules-interface";
import { motion } from "framer-motion";

export default function SearchPortal({
  entries,
  setSearchResults,
}: {
  entries: RootProject[] | RootModule[];
  setSearchResults: Dispatch<SetStateAction<RootProject[] | RootModule[] | []>>;
}) {
  const [isClient, setIsClient] = React.useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * Filter the entries based on the search query
   * @param e - The event object
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;

    if (searchQuery === "") {
      setSearchResults(entries);
      return;
    }

    const filteredData = entries.filter((item: RootProject | RootModule) => {
      return (
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.project_number?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setSearchResults(filteredData as RootProject[] | RootModule[]);
  };

  /**
   * Reset the search results and clear the input field
   */
  const resetSearch = () => {
    setSearchResults(entries);
    input.current!.value = "";
  };

  return (
    <Portal.Root
      container={isClient ? document.getElementById("searchPortal") : null}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input
            placeholder="Search all entries..."
            onChange={handleSearch}
            size="3"
            ref={input}
          />
          <TextField.Slot pr="3">
            <IconButton size="2" variant="ghost" onClick={resetSearch}>
              <ReloadIcon height="16" width="16" />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </motion.div>
    </Portal.Root>
  );
}
