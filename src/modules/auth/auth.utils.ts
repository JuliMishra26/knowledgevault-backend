import type { Request } from 'express';

export function getBearerToken(req: Request): string | null {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return null;
  }

  if (!authorization.startsWith('Bearer ')) {
    return null;
  }

  return authorization.substring(7);
}
