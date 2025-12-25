import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Bank, BankStatus } from '../../entities/bank.entity';
import { Loan, LoanStatus } from '../../entities/loan.entity';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async findAll(): Promise<Bank[]> {
    return this.bankRepository.find({
      where: { status: BankStatus.ACTIVE },
    });
  }

  async findById(id: string): Promise<Bank> {
    const bank = await this.bankRepository.findOne({ where: { id } });
    if (!bank) {
      throw new NotFoundException('Bank not found');
    }
    return bank;
  }

  async create(data: Partial<Bank>): Promise<Bank> {
    const bank = this.bankRepository.create(data);
    return this.bankRepository.save(bank);
  }

  async update(id: string, data: Partial<Bank>): Promise<Bank> {
    const bank = await this.findById(id);
    Object.assign(bank, data);
    return this.bankRepository.save(bank);
  }

  async getDashboard(bankId: string) {
    const bank = await this.findById(bankId);

    const totalLoans = await this.loanRepository.count({
      where: { bankId },
    });

    const activeLoans = await this.loanRepository.count({
      where: { bankId, status: In([LoanStatus.ACTIVE, LoanStatus.IN_REPAYMENT]) },
    });

    const npaLoans = await this.loanRepository.count({
      where: { bankId, status: LoanStatus.NPA },
    });

    const totalDisbursed = await this.loanRepository
      .createQueryBuilder('loan')
      .select('SUM(loan.disbursedAmount)', 'total')
      .where('loan.bankId = :bankId', { bankId })
      .getRawOne();

    const totalOutstanding = await this.loanRepository
      .createQueryBuilder('loan')
      .select('SUM(loan.outstandingPrincipal)', 'total')
      .where('loan.bankId = :bankId', { bankId })
      .getRawOne();

    return {
      bank,
      stats: {
        totalLoans,
        activeLoans,
        npaLoans,
        npaRate: totalLoans > 0 ? (npaLoans / totalLoans) * 100 : 0,
        totalDisbursed: totalDisbursed?.total || 0,
        totalOutstanding: totalOutstanding?.total || 0,
      },
    };
  }

  async getPendingApplications(bankId: string) {
    return this.loanRepository.find({
      where: {
        bankId,
        status: In([LoanStatus.BANK_SUBMITTED, LoanStatus.UNDER_REVIEW]),
      },
      relations: ['learner', 'course', 'trainingProvider'],
      order: { createdAt: 'ASC' },
    });
  }
}

