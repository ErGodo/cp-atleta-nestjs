import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';

@Injectable()
export class AthleteService {
  constructor(
    @InjectRepository(Athlete)
    private athleteRepository: Repository<Athlete>,
  ) { }

  async create(athleteData: Partial<Athlete>): Promise<Athlete> {
    const athlete = this.athleteRepository.create(athleteData);
    return this.athleteRepository.save(athlete);
  }

  async findAll(): Promise<Athlete[]> {
    return this.athleteRepository.find();
  }

  async findByClub(fkClub: string): Promise<Athlete[]> {
    return this.athleteRepository.find({
      where: { fkClub },
      relations: ['athleteClubCategories', 'athleteClubCategories.clubCategory', 'sportProfile'],
    });
  }

  async findUnassignedByClub(fkClub: string): Promise<Athlete[]> {
    // We find athletes where the athleteClubCategories array is empty
    const allClubAthletes = await this.findByClub(fkClub);
    return allClubAthletes.filter(athlete => !athlete.athleteClubCategories || athlete.athleteClubCategories.length === 0);
  }

  async findOne(pkAthlete: string): Promise<Athlete> {
    const athlete = await this.athleteRepository.findOne({
      where: { pkAthlete },
      relations: ['sportProfile'],
    });
    if (!athlete) {
      throw new NotFoundException(`Athlete with ID ${pkAthlete} not found`);
    }
    return athlete;
  }

  async update(pkAthlete: string, updateData: Partial<Athlete>): Promise<Athlete> {
    const result = await this.athleteRepository.update(pkAthlete, updateData);
    if (result.affected === 0) {
      throw new NotFoundException(`Athlete with ID ${pkAthlete} not found`);
    }
    return this.findOne(pkAthlete);
  }

  async remove(pkAthlete: string): Promise<void> {
    const result = await this.athleteRepository.delete(pkAthlete);
    if (result.affected === 0) {
      throw new NotFoundException(`Athlete with ID ${pkAthlete} not found`);
    }
  }
}