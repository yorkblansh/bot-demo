// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT);
// }
// bootstrap();

import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import express from 'express'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('rest api')
		.setDescription('API description')
		.setVersion('0.1')
		.addTag('api')
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('swagger', app, document)

	app.use(express.json({ limit: '50mb' }))
	app.use(express.urlencoded({ limit: '50mb' }))
	app.enableCors({ origin: '*' })
	app.useGlobalPipes(new ValidationPipe({ transform: true }))
	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(
		new PrismaClientExceptionFilter(httpAdapter, {
			// Prisma Error Code: HTTP Status Response
			P2000: HttpStatus.BAD_REQUEST,
			P2002: HttpStatus.CONFLICT,
			P2003: HttpStatus.FAILED_DEPENDENCY,
			P2025: HttpStatus.NOT_FOUND,
		}),
	)

	const port = Number(5055)

	await app.listen(port, () => {
		const address = 'https' + '://' + 'hostname' + ':' + port + '/'
		Logger.log('Listening at ' + address)
	})
}

bootstrap()

// export const viteNodeApp = NestFactory.create(AppModule)
