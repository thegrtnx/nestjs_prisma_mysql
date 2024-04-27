import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { GuarantorModule } from 'src/guarantor/guarantor.module';
@Module({
  imports: [UsersModule, GuarantorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
