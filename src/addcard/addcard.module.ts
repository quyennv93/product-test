import { Module } from '@nestjs/common';
import { AddcardController } from './addcard.controller';

@Module({
  controllers: [AddcardController]
})
export class AddcardModule {}
