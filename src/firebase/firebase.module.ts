import { Global, Module } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FirebaseService } from './firebase.service';

@Global()
@Module({
    providers: [FirebaseService, FirebaseAuthGuard],
    exports: [FirebaseService, FirebaseAuthGuard],
})
export class FirebaseModule { }
