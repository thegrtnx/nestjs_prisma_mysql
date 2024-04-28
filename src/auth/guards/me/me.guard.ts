/*import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class Me implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.users;
  }
}*/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Me = createParamDecorator(
  async (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
