import type { Context } from 'telegraf'
import type { Update } from 'telegraf/typings/core/types/typegram'
import type { SceneContext } from 'telegraf/typings/scenes'

interface MessageContext {
	chat_id: number
	message_id: number
	data?: unknown
}

interface SessionData {
	// choosen_fiat_currency?: string
	// choosen_crypto_currency?: string
	counter?: number
	messageContext?: MessageContext[]
}

export interface UserSessionContext extends Context {
	session?: SessionData
}
export type MyContext = Context & UserSessionContext

export type MySceneContext = UserSessionContext & SceneContext

export type MySceneActionContext = MySceneContext & {
	update: Update.CallbackQueryUpdate
}

export interface TelegrafMessage {
	text: string
	message_id: number
	date: number
}

export interface TelegrafContactMessage extends TelegrafMessage {
	contact: {
		phone_number: string
	}
}
