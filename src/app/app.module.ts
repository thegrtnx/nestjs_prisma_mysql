import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { GuarantorModule } from 'src/guarantor/guarantor.module';
import { AuthModule } from 'src/auth/auth.module';
import { AdminModule } from 'src/admin/admin.module';
import { LoanModule } from 'src/loan/loan.module';
import { ModeratorModule } from 'src/moderator/moderator.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ApplyloanModule } from 'src/applyloan/applyloan.module';

@Module({
  imports: [
    UsersModule,
    GuarantorModule,
    AuthModule,
    AdminModule,
    LoanModule,
    CloudinaryModule,
    PrismaModule,
    ModeratorModule,
    ApplyloanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
