import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
    private readonly logger = new Logger(FirebaseService.name);

    onModuleInit() {
        if (admin.apps.length === 0) {
            try {
                admin.initializeApp({
                    credential: admin.credential.applicationDefault(),
                });
                this.logger.log('Firebase Admin initialized successfully');
            } catch (error) {
                this.logger.error('Failed to initialize Firebase Admin', error);
            }
        } else {
            this.logger.log('Firebase Admin already initialized');
        }
    }

    getAuth() {
        return admin.auth();
    }
}
