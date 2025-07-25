import { Client, Account, ID, Databases, OAuthProvider, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const storage = new Storage(client);
const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID, OAuthProvider, storage };
