import { Injectable, OnModuleInit } from '@nestjs/common'
import { Api, TelegramClient } from 'telegram'
import input from 'input'
import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'

@Injectable()
//TODO uncomment OnModuleInit
// implements OnModuleInit
export class GramService {
	private client: TelegramClient

	// constructor(apiId: number, apiHash: string, stringSession?: string) {
	// 	this.client = new TelegramClient(stringSession, apiId, apiHash, {
	// 		connectionRetries: 5,
	// 	})
	// }

	// async onModuleInit() {
	// 	await this.init()
	// 	// await this.listen()
	// }

	async init() {
		await this.client.start({
			phoneNumber: async () => await input.text('Please enter your number: '),
			password: async () => await input.text('Please enter your password: '),
			phoneCode: async () =>
				await input.text('Please enter the code you received: '),
			onError: (err) => console.log(err),
		})
		// ;(async () => {
		// console.log('Loading interactive example...')
		// console.log('You should now be connected.')
		console.log(this.client.session.save()) // Save this string to avoid logging in again
		// await client.sendMessage('me', { message: 'Hello!' })
		// })()
	}

	async getAllMessagesForUser(username: string) {
		const users = await this.client.invoke(
			new Api.users.GetUsers({
				id: [username],
			}),
		)

		return pipe(
			await this.client.getMessages(users[0]),
			A.map((e) => ({
				date: new Date(e.date),
				message: e.message,
				// sticker: e.sticker,
			})),
		)
	}
}
