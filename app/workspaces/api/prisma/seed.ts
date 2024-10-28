import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const users = await Promise.all(
		[0].map((n, i) => {
			return prisma.user.upsert({
				where: { email: `user${n}@mail.com` },
				update: {},
				create: {
					email: `user${n}@mail.com`,
					username: `user${n}`,
					password: `123`,
					permission: 'nonadmin',
					tasks: {
						create: {
							body: `body for the task${n}`,
							name: `task${n}`,
						},
					},
				},
			})
		}),
	)

	const admins = await Promise.all(
		[1].map((n, i) => {
			return prisma.user.upsert({
				where: { email: `user${n}@mail.com` },
				update: {},
				create: {
					email: `user${n}@mail.com`,
					username: `user${n}`,
					password: `123`,
					permission: 'admin',
					tasks: {
						create: {
							body: `body for the task${n}`,
							name: `task${n}`,
						},
					},
				},
			})
		}),
	)

	console.log({ users, admins })
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
