import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth";

import firebaseConfig from "@/configs/firebaseConfig.json";

let app;
if (!getApps.length) app = initializeApp(firebaseConfig);
else app = getApp();

const auth = getAuth(app);

export { auth }


