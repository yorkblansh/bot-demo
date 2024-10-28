import { pipe } from 'fp-ts/lib/function'
import { MyContext } from 'src/telegram/telegram.interfaces'

interface Props {
	message_id: number
	chat: {
		id: number
	}
}

export const pushMessage =
	(ctx: MyContext) =>
	({ message_id, chat: { id } }: Props) => {
		let newMC = ctx.session.messageContext
		newMC.push({ message_id, chat_id: id })
		ctx.session.messageContext = newMC
	}
