import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AthleteProfile } from '../athlete-profile/athlete-profile.entity';

@Injectable()
export class AthleteProfileService {
  constructor(
    @InjectRepository(AthleteProfile)
    private athleteProfileRepository: Repository<AthleteProfile>,
  ) { }

  async create(athleteProfileData: Partial<AthleteProfile>): Promise<AthleteProfile> {
    try {
      const athleteProfile = this.athleteProfileRepository.create(athleteProfileData);
      return await this.athleteProfileRepository.save(athleteProfile);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Athlete profile already exists for this athlete');
      }
      if (error.code === '23503') {
        throw new BadRequestException('Athlete ID not found');
      }
      throw new InternalServerErrorException('Failed to create athlete profile: ' + error.message);
    }
  }

  async findAll(): Promise<AthleteProfile[]> {
    return this.athleteProfileRepository.find({ relations: ['athlete'] });
  }

  async findOne(pkAthleteProfile: string): Promise<AthleteProfile> {
    const athleteProfile = await this.athleteProfileRepository.findOne({
      where: { pkAthleteProfile },
      relations: ['athlete'],
    });
    if (!athleteProfile) {
      throw new NotFoundException(`AthleteProfile with ID ${pkAthleteProfile} not found`);
    }
    return athleteProfile;
  }

  async update(pkAthleteProfile: string, updateData: Partial<AthleteProfile>): Promise<AthleteProfile> {
    const result = await this.athleteProfileRepository.update(pkAthleteProfile, updateData);
    if (result.affected === 0) {
      throw new NotFoundException(`AthleteProfile with ID ${pkAthleteProfile} not found`);
    }
    return this.findOne(pkAthleteProfile);
  }

  async remove(pkAthleteProfile: string): Promise<void> {
    const result = await this.athleteProfileRepository.delete(pkAthleteProfile);
    if (result.affected === 0) {
      throw new NotFoundException(`AthleteProfile with ID ${pkAthleteProfile} not found`);
    }
  }
}