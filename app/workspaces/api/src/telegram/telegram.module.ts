import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'
import { SessionModule } from '../session/session.module'
import { SessionService } from '../session/session.service'
import { ChooseCryptoCurrencyScene } from './scenes/choose-crypto.scene'
import { ChooseFiatCurrencyScene } from './scenes/choose-fiat.scene'
import { TelegramService } from './telegram.service'
import { TelegramUpdate } from './telegram.update'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TelegrafModule.forRootAsync({
			imports: [SessionModule],
			inject: [SessionService],
			useFactory: (sessionService: SessionService) => ({
				token: import.meta.env.VITE_TOKEN,
				middlewares: [sessionService.createMongoDBSession()],
			}),
		}),
	],
	providers: [
		TelegramService,
		TelegramUpdate,
		ChooseFiatCurrencyScene,
		ChooseCryptoCurrencyScene,
	],
})
export class TelegramModule {}
