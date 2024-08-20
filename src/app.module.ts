import { Module } from '@nestjs/common';

//Замена фреймворка с express на Nest и добовление логина
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';


import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.model';
import { TelegramModule } from './telegram/telegram.module';
import { TelegramClientModule } from './telegram-client/telegram-client.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: 'root',
      password:'root',
      database: process.env.MYSQL_DB,
      models: [User,Token],
      autoLoadModels:false
    }),
    UserModule,
    TokenModule,
    TelegramModule,
    TelegramClientModule
  ]
})
export class AppModule {}
