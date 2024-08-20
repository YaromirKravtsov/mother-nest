import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TelegramClientService implements OnModuleInit, OnModuleDestroy {
  private client: TelegramClient;
  private sessionFilePath = path.resolve(__dirname, '../../session.txt');
  private stringSession: StringSession;

  constructor() {
    const apiId = parseInt(process.env.API_ID, 10);
    const apiHash = process.env.API_HASH;

    let sessionData: string;
    if (fs.existsSync(this.sessionFilePath)) {
      sessionData = fs.readFileSync(this.sessionFilePath, 'utf8');
    } else {
      sessionData = ''; // Если файл не найден, создаём новую сессию
    }

    this.stringSession = new StringSession(sessionData);
    this.client = new TelegramClient(this.stringSession, apiId, apiHash, {});
  }

  async onModuleInit() {
    await this.initializeClient();
  }

  async initializeClient() {
    console.log('Loading interactive session...');
    await this.client.start({
      phoneNumber: async () => '+380955378077',
      phoneCode: async () => {
        const input = require('input');
        return await input.text("Code ?");
      },
      onError: (err) => console.log(err),
    });

    console.log('You are now connected.');
    //@ts-ignore
    fs.writeFileSync(this.sessionFilePath, this.client.session.save(), 'utf8');
  }

  getClient() {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.disconnect();
  }
}
