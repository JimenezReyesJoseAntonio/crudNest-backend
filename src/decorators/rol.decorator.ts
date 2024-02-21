import { Reflector } from '@nestjs/core';

export const RolDecorator = Reflector.createDecorator<string[]>();