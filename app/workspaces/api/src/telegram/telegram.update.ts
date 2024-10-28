import { Logger } from '@nestjs/common'
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import type { SceneContext } from 'telegraf/typings/scenes'
import { ACTION_BUY, SCENE_CHOOSE_FIAT_CURRENCY } from './telegram.constants'
import type { MyContext } from './telegram.interfaces'

@Update()
export class TelegramUpdate {
	@Start()
	async start(@Ctx() ctx: MyContext) {
		try {
			ctx.reply(
				'Выберите действие',
				Markup.inlineKeyboard([
					[{ text: ACTION_BUY.text, callback_data: ACTION_BUY.callback }],
				]),
			)
		} catch (e) {
			Logger.error(e)
		}
	}

	// @Command('my_accounts')
	// my_accounts(@Ctx() ctx: MyContext) {
	// 	try {
	// 		// ctx.telegram.callApi('setMyCommands', {
	// 		// 	commands: [
	// 		// 		{ command: 'start', description: 'إبدأ من جديد' },
	// 		// 		{ command: 'help', description: 'طلب مساعدة ' },
	// 		// 		{ command: 'list', description: 'القائمة ' },
	// 		// 		// { command, description }
	// 		// 	],
	// 		// })
	// 		ctx
	// 	} catch (error) {}
	// }
	@Action(ACTION_BUY.callback)
	async startBuyScene(@Ctx() ctx: SceneContext) {
		try {
			await ctx.answerCbQuery()
			await ctx.scene.enter(SCENE_CHOOSE_FIAT_CURRENCY)
		} catch (e) {
			Logger.error(e)
		}
	}
}
