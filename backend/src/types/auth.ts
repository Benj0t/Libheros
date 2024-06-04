export type JwtPayload = {
  userId: string;
};

export interface RequestCtx extends Request {
  userId: string;
}
