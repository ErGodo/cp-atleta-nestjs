import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AthleteEligibility } from '../athlete-eligibility/athlete-eligibility.entity';

@Injectable()
export class AthleteEligibilityService {
  constructor(
    @InjectRepository(AthleteEligibility)
    private athleteEligibilityRepository: Repository<AthleteEligibility>,
  ) {}

  async create(athleteEligibilityData: Partial<AthleteEligibility>): Promise<AthleteEligibility> {
    const athleteEligibility = this.athleteEligibilityRepository.create(athleteEligibilityData);
    return this.athleteEligibilityRepository.save(athleteEligibility);
  }

  async findAll(): Promise<AthleteEligibility[]> {
    return this.athleteEligibilityRepository.find({ relations: ['athlete'] });
  }

  async findOne(pkAthleteEligibility: string): Promise<AthleteEligibility> {
    const athleteEligibility = await this.athleteEligibilityRepository.findOne({
      where: { pkAthleteEligibility },
      relations: ['athlete'],
    });
    if (!athleteEligibility) {
      throw new NotFoundException(`AthleteEligibility with ID ${pkAthleteEligibility} not found`);
    }
    return athleteEligibility;
  }

  async update(pkAthleteEligibility: string, updateData: Partial<AthleteEligibility>): Promise<AthleteEligibility> {
    const result = await this.athleteEligibilityRepository.update(pkAthleteEligibility, updateData);
    if (result.affected === 0) {
      throw new NotFoundException(`AthleteEligibility with ID ${pkAthleteEligibility} not found`);
    }
    return this.findOne(pkAthleteEligibility);
  }

  async remove(pkAthleteEligibility: string): Promise<void> {
    const result = await this.athleteEligibilityRepository.delete(pkAthleteEligibility);
    if (result.affected === 0) {
      throw new NotFoundException(`AthleteEligibility with ID ${pkAthleteEligibility} not found`);
    }
  }
}