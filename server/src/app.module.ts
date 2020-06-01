import {HttpModule, Module} from '@nestjs/common';
import {ConvertController} from './controllers/convert.controller';
import {ApiService} from './services/api.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ConverterService} from './services/converter.service';
import {MongooseModule} from '@nestjs/mongoose';
import {History, HistorySchema} from "./schemas/history.schema";
import {HistoryController} from "./controllers/history.controller";
import {HistoryService} from "./services/history.service";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.mongo', '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])
  ],
  controllers: [ConvertController, HistoryController],
  providers: [ConverterService, ApiService, HistoryService],
})

export class AppModule {}
