import "./App.css";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import UrlListItem from "./url";

function App() {
  const [urls, setUrls] = useState([]);
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = () => {
    db.collection("urls").onSnapshot((querySnapshot) => {
      setUrls(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          originalUrl: doc.data().url,
          shortUrl: doc.data().url + doc.data().code.slice(0, 8),
        }))
      );
    });
  };

  const addUrl = (e) => {
    e.preventDefault();
    let code = uuidv4();
    db.collection("urls").add({
      url: urlInput,
      code: code,
    });
    setUrlInput("");
  };

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          <TextField
            id="outlined-basic"
            label="URL Shortner"
            variant="outlined"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
            }}
            style={{
              maxWidth: "500px",
              width: "90vh",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addUrl}
            sytle={{ display: "none" }}
          >
            Shorten
          </Button>
        </form>
        {/* Adding all urls on bottom */}
        <div style={{ marginTop: "20px" }}>
          {urls.map((url) => {
            return (
              <UrlListItem
                id={url.id}
                originalUrl={url.originalUrl}
                shortUrl={url.shortUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default App;
