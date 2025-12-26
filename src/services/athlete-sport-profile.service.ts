import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AthleteSportProfile } from '../athlete-sport-profile/athlete-sport-profile.entity';

@Injectable()
export class AthleteSportProfileService {
  constructor(
    @InjectRepository(AthleteSportProfile)
    private athleteSportProfileRepository: Repository<AthleteSportProfile>,
  ) {}

  async create(athleteSportProfileData: Partial<AthleteSportProfile>): Promise<AthleteSportProfile> {
    const athleteSportProfile = this.athleteSportProfileRepository.create(athleteSportProfileData);
    return this.athleteSportProfileRepository.save(athleteSportProfile);
  }

  async findAll(): Promise<AthleteSportProfile[]> {
    return this.athleteSportProfileRepository.find({ relations: ['athlete'] });
  }

  async findOne(pkAthleteSportProfile: string): Promise<AthleteSportProfile> {
    const athleteSportProfile = await this.athleteSportProfileRepository.findOne({
      where: { pkAthleteSportProfile },
      relations: ['athlete'],
    });
    if (!athleteSportProfile) {
      throw new NotFoundException(`AthleteSportProfile with ID ${pkAthleteSportProfile} not found`);
    }
    return athleteSportProfile;
  }

  async update(pkAthleteSportProfile: string, updateData: Partial<AthleteSportProfile>): Promise<AthleteSportProfile> {
    const result = await this.athleteSportProfileRepository.update(pkAthleteSportProfile, updateData);
    if (result.affected === 0) {
      throw new NotFoundException(`AthleteSportProfile with ID ${pkAthleteSportProfile} not found`);
    }
    return this.findOne(pkAthleteSportProfile);
  }

  async remove(pkAthleteSportProfile: string): Promise<void> {
    const result = await this.athleteSportProfileRepository.delete(pkAthleteSportProfile);
    if (result.affected === 0) {
      throw new NotFoundException(`AthleteSportProfile with ID ${pkAthleteSportProfile} not found`);
    }
  }
}