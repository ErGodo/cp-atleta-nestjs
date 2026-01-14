import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { FirebaseAuthGuard } from './auth/guards/firebase-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('auth/me')
  @UseGuards(FirebaseAuthGuard)
  getMe(@CurrentUser() user: any) {
    return { uid: user.uid, email: user.email, claims: user };
  }
}
