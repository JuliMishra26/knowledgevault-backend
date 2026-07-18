import type { Request } from 'express';

import { prisma } from '@/lib/prisma';
import { getBearerToken } from '@/modules/auth/auth.utils';
import { verifyToken } from '@/modules/auth/jwt';

export interface GraphQLContext {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export async function createContext({
  req,
}: {
  req: Request;
}): Promise<GraphQLContext> {
  const token = getBearerToken(req);

  if (!token) {
    return {
      user: null,
    };
  }

  try {
    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return {
        user: null,
      };
    }

    return {
      user,
    };
  } catch {
    return {
      user: null,
    };
  }
}
