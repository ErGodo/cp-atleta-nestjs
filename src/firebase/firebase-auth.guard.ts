import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    private readonly logger = new Logger(FirebaseAuthGuard.name);

    constructor(private readonly firebaseService: FirebaseService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const decodedToken = await this.firebaseService.getAuth().verifyIdToken(token);
            request.user = decodedToken;
            return true;
        } catch (error) {
            this.logger.error(`Token verification failed: ${error.message}`);
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
