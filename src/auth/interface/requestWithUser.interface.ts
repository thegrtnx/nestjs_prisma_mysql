import { Request } from 'express';
import { Users } from '@prisma/client';

interface RequestWithUser extends Request {
  user: Users;
}

export default RequestWithUser;
