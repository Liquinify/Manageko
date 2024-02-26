import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import EditBoard from "../modals/EditBoard";

const EmptyBoard = () => {
  const [createColumn, setCreateColumn] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "47%",
      }}
    >
      <Typography sx={{ color: "gray", fontSize: 20 }}>
        This board is empty. Create a new column to get started.
      </Typography>
      <Button
        variant="outlined"
        sx={{ mt: 3 }}
        onClick={() => setCreateColumn(true)}
      >
        + Add a column
      </Button>
      {createColumn && (
        <EditBoard
          columnModal={createColumn}
          setColumnModal={setCreateColumn}
        />
      )}
    </Box>
  );
};

export default EmptyBoard;
