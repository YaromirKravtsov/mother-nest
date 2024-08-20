import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { TelegramClientService } from 'src/telegram-client/telegram-client.service';

@Module({
  controllers: [TelegramController],
  providers: [TelegramService,TelegramClientService]
})
export class TelegramModule {}
