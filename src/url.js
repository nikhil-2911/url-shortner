import React from "react";
import { Button, ListItem, ListItemText } from "@material-ui/core";
import { db } from "./firebase";

export default function UrlListItem({ id, originalUrl, shortUrl }) {
  const deleteUrl = () => {
    db.collection("urls").doc(id).delete();
  };
  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText primary={originalUrl} />
        <ListItemText primary={shortUrl} />
      </ListItem>
      <Button onClick={deleteUrl}>X</Button>
    </div>
  );
}
