export interface TokenModel {
    username: string;
    jti: string;
    role: string;
    permission: string[];
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
  }