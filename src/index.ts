import dotenv from "dotenv";
dotenv.config();

import RobloxClient from "./client/RobloxClient";
const client = new RobloxClient(process.env.GROUP_ID);
client.start();
