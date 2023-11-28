import React, { type MouseEventHandler } from "react";
import { Box, Button } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

type SaveEntryButtonProps = {
  onSave: MouseEventHandler<HTMLButtonElement> | undefined;
};

const SaveEntryButton = ({ onSave }: SaveEntryButtonProps) => {
  return (
    <Box className="fixed bottom-6 right-6 z-10 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Button
          size="4"
          color="cyan"
          variant="surface"
          highContrast
          radius="full"
          className="backdrop-blur-sm"
          onClick={onSave}
        >
          <CheckIcon height="24" width="24" />
          Save
        </Button>
      </motion.div>
    </Box>
  );
};

export default SaveEntryButton;
