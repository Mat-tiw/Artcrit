import express from "express";
import cors from "cors";
import router from "../router/router.js";
import sequelize from "../config/dbconfig.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',router)
await sequelize.sync();
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});