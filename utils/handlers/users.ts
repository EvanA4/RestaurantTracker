import { MAPIUser } from "@/types/auth0/mapi_user";

export async function getAuth0AccessToken(): Promise<string> {
  const rawRes = await fetch(`${process.env.AUTH0_DOMAIN!}/oauth/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CCAPP_CLIENT_ID!,
      client_secret: process.env.AUTH0_CCAPP_CLIENT_SECRET!,
      audience: `${process.env.AUTH0_DOMAIN!}/api/v2/`,
      grant_type: "client_credentials",
    }),
  });
  const res = await rawRes.json();

  return res.access_token ?? "";
}

export async function getUserById(id: string): Promise<MAPIUser | undefined> {
  const token = await getAuth0AccessToken();
  const rawRes = await fetch(
    `${process.env.AUTH0_DOMAIN!}/api/v2/users/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const res = await rawRes.json();

  return res.error ? undefined : (res as MAPIUser);
}
