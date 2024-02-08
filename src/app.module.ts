import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WhatsappService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [WhatsappService],
})
export class AppModule {}
