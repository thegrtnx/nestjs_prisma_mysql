import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { LoanModule } from 'src/loan/loan.module'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaService } from 'lib/prisma.service'
import { AdminModule } from 'src/admin/admin.module'
import { UsersModule } from 'src/users/users.module'
import { GuarantorModule } from 'src/guarantor/guarantor.module'
import { ModeratorModule } from 'src/moderator/moderator.module'
import { ApplyloanModule } from 'src/applyloan/applyloan.module'
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module'

@Module({
  imports: [
    AuthModule,
    LoanModule,
    AdminModule,
    UsersModule,
    GuarantorModule,
    ModeratorModule,
    ApplyloanModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
