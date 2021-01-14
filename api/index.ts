import { NowRequest, NowResponse } from "@vercel/node";
import admin from "firebase-admin";
import axios from "axios";

interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: number;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
}
interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
}

admin.initializeApp({
  credential: admin.credential.cert(require("../firebase/hyunwoo-bot-5b9111af24ff.json")),
});

const firestore = admin.firestore();

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const payload = {
      user: (await axios.get("https://discord.com/api/v8/users/@me", { headers: { Authorization: `Bearer ${req.body.access_token}` } })).data,
      guilds: [],
    };

    const guilds: Guild[] = (await axios.get("https://discord.com/api/v8/users/@me/guilds", { headers: { Authorization: `Bearer ${req.body.access_token}` } })).data;
    for (const collection of await firestore.listCollections()) {
      const guild: Guild = guilds.find((guild: Guild) => guild.id === collection.id);
      if (!guild) continue;

      payload.guilds.push(guild);
    }

    res.status(200).send(payload);
  } catch (err) {
    res.status(400).send("");
  }
};
