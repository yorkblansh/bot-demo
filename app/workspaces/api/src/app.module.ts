import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SessionModule } from './session/session.module'
import { TelegramModule } from './telegram/telegram.module'
import { GrammModule } from './gramm/gramm.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [
		MongooseModule.forRoot(import.meta.env.VITE_URL_DB),
		SessionModule,
		TelegramModule,
		// GrammModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
