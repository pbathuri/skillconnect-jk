import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { Bank } from '../../entities/bank.entity';
import { Loan } from '../../entities/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank, Loan])],
  controllers: [BanksController],
  providers: [BanksService],
  exports: [BanksService],
})
export class BanksModule {}

