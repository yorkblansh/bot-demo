import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { GramService } from './gramm.service'

@Module({
	controllers: [],
	providers: [GramService],
	imports: [HttpModule],
})
export class GrammModule {}
