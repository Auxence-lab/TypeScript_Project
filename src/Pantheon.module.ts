import { Module } from '@nestjs/common';
import { PantheonController } from './Pantheon.controller';
import { PantheonService } from './Pantheon.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  controllers: [PantheonController],
  providers: [PantheonService],
})
export class PantheonModule {}
