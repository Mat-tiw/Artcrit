import express from "express";
import cors from "cors";
import router from "../router/router.js";
import sequelize from "../config/dbconfig.js";
import '../model/Setup.js'
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use('/static', express.static('public'));
app.use('/api', router);

await sequelize.sync();

const PORT = 3030;
app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`);
});
