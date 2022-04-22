import React from "react";
import { Card, CardContent } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <Card>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <h1>Not found</h1>
        </CardContent>
      </Card>
    </>
  );
};

export default NotFound;
