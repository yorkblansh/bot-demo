import { Logger } from '@nestjs/common'
import { Action, Ctx, Start, Update } from 'nestjs-telegraf'
import type { SceneContext } from 'telegraf/typings/scenes'
import {
	ACTION_BUY,
	ACTION_COUNTER,
	SCENE_CHOOSE_FIAT_CURRENCY,
} from './telegram.constants'
import type { MyContext } from './telegram.interfaces'
import { message } from '../utils/message'
import { pipe } from 'fp-ts/lib/function'
import { pushMessage } from '../utils/pushMessage'
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram'

const msg = (counter: number) =>
	message([
		'Приветствую, это демо-бот для просмотра функционала который может быть реализован для вас', //
		'',
		'Используйте кнопки ниже, что бы переключать счетчики',
		``,
		`счетчик: ${counter}`,
	])

const inlineKeyboardButton: InlineKeyboardButton[][] = [
	[
		{
			text: ACTION_COUNTER.DEC.text,
			callback_data: ACTION_COUNTER.DEC.callback,
		},
		{
			text: ACTION_COUNTER.INC.text,
			callback_data: ACTION_COUNTER.INC.callback,
		},
	],
]

@Update()
export class TelegramUpdate {
	private updateStartMessage() {}

	@Start()
	async start(@Ctx() ctx: MyContext) {
		//TODO сделать удаление всех сооющений которые в данный момент у пользователя

		ctx.session.counter = 0
		ctx.session.messageContext = undefined

		try {
			pipe(
				await ctx.reply(msg(ctx.session.counter), {
					reply_markup: {
						inline_keyboard: inlineKeyboardButton,
					},
				}),
				pushMessage(ctx),
			)
		} catch (e) {
			Logger.error(e)
		}
	}

	@Action(ACTION_COUNTER.DEC.callback)
	decCounter(@Ctx() ctx: MyContext) {
		ctx.session.counter = ctx.session.counter - 1
		ctx.editMessageText(msg(ctx.session.counter))
	}

	@Action(ACTION_COUNTER.INC.callback)
	incCounter(@Ctx() ctx: MyContext) {
		ctx.session.counter = ctx.session.counter + 1
		ctx.editMessageText(msg(ctx.session.counter))
	}

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
