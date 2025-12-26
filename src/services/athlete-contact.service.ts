import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AthleteContact } from '../athlete-contact/athlete-contact.entity';

@Injectable()
export class AthleteContactService {
  constructor(
    @InjectRepository(AthleteContact)
    private athleteContactRepository: Repository<AthleteContact>,
  ) {}

  async create(athleteContactData: Partial<AthleteContact>): Promise<AthleteContact> {
    const athleteContact = this.athleteContactRepository.create(athleteContactData);
    return this.athleteContactRepository.save(athleteContact);
  }

  async findAll(): Promise<AthleteContact[]> {
    return this.athleteContactRepository.find({ relations: ['athlete'] });
  }

  async findOne(pkAthleteContact: string): Promise<AthleteContact> {
    const athleteContact = await this.athleteContactRepository.findOne({
      where: { pkAthleteContact },
      relations: ['athlete'],
    });
    if (!athleteContact) {
      throw new NotFoundException(`AthleteContact with ID ${pkAthleteContact} not found`);
    }
    return athleteContact;
  }

  async update(pkAthleteContact: string, updateData: Partial<AthleteContact>): Promise<AthleteContact> {
    const result = await this.athleteContactRepository.update(pkAthleteContact, updateData);
    if (result.affected === 0) {
      throw new NotFoundException(`AthleteContact with ID ${pkAthleteContact} not found`);
    }
    return this.findOne(pkAthleteContact);
  }

  async remove(pkAthleteContact: string): Promise<void> {
    const result = await this.athleteContactRepository.delete(pkAthleteContact);
    if (result.affected === 0) {
      throw new NotFoundException(`AthleteContact with ID ${pkAthleteContact} not found`);
    }
  }
}