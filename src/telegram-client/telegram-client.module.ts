import { Module } from '@nestjs/common';
import { TelegramClientService } from './telegram-client.service';

@Module({
  providers: [TelegramClientService]
})
export class TelegramClientModule {}
