export type MAPIUser = {
  user_id: string;
  name: string;
  nickname: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  email_verified: boolean;
  idp_tenant_domain?: string;
  identities: {
    access_token: string;
    expires_in: number;
    connection: string;
    user_id: string;
    provider: string;
    isSocial: boolean;
  }[];
  last_login: string;
  last_ip: string;
  logins_count: number;
  created_at: string;
  updated_at: string;
};
