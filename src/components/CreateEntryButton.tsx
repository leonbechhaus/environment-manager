import React from "react";
import { Box, IconButton, Link } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

type CreateEntryButtonProps = {
  path: string;
};

const CreateEntryButton = ({ path }: CreateEntryButtonProps) => {
  return (
    <Box className="fixed bottom-6 right-6 z-10 scale-150 p-4">
      <Link href={`/${path}/create`}>
        <IconButton
          size="4"
          color="cyan"
          variant="surface"
          highContrast
          radius="full"
          className="backdrop-blur-sm"
        >
          <PlusIcon height="24" width="24" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default CreateEntryButton;
