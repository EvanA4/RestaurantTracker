export type MAPIUser = {
  email_verified: boolean;
  idp_tenant_domain?: string;
  email: string;
  name: string;
  picture: string;
  updated_at: string;
  user_id: string;
  family_name: string;
  given_name: string;
  identities: {
    access_token: string;
    expires_in: number;
    connection: string;
    user_id: string;
    provider: string;
    isSocial: boolean;
  }[];
  nickname: string;
  created_at: string;
  last_login: string;
  last_ip: string;
  logins_count: number;
};
