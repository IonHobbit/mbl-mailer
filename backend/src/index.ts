import app from "./app";
import config, { validateConfig } from "./config.util";
import db from "./db";

validateConfig();
const port = config.PORT || 3001;

db.connect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
