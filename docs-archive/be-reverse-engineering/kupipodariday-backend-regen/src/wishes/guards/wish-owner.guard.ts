import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class WishOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Implement ownership logic here
    return true;
  }
} 