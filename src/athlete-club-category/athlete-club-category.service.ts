import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Athlete } from '../athlete/athlete.entity';
import { AthleteClubCategory } from './athlete-club-category.entity';
import { CreateAthleteClubCategoryDto } from './dto/create-athlete-club-category.dto';
import { UpdateAthleteClubCategoryDto } from './dto/update-athlete-club-category.dto';

@Injectable()
export class AthleteClubCategoryService {
    constructor(
        @InjectRepository(AthleteClubCategory)
        private readonly athleteClubCategoryRepository: Repository<AthleteClubCategory>,
        @InjectRepository(Athlete)
        private readonly athleteRepository: Repository<Athlete>,
    ) { }

    async create(createDto: CreateAthleteClubCategoryDto): Promise<AthleteClubCategory> {
        // Verify athlete exists
        const athlete = await this.athleteRepository.findOne({ where: { pkAthlete: createDto.fkAthlete } });
        if (!athlete) {
            throw new NotFoundException(`Athlete with ID ${createDto.fkAthlete} not found`);
        }

        const newRecord = this.athleteClubCategoryRepository.create(createDto);
        return await this.athleteClubCategoryRepository.save(newRecord);
    }

    async findAll(): Promise<AthleteClubCategory[]> {
        return await this.athleteClubCategoryRepository.find();
    }

    async findOne(id: string): Promise<AthleteClubCategory> {
        const record = await this.athleteClubCategoryRepository.findOne({ where: { pkAthleteClubCategory: id } });
        if (!record) {
            throw new NotFoundException(`AthleteClubCategory with ID ${id} not found`);
        }
        return record;
    }

    async findByAthlete(athleteId: string): Promise<AthleteClubCategory[]> {
        return await this.athleteClubCategoryRepository.find({ where: { fkAthlete: athleteId } });
    }

    async findByCategory(categoryId: string): Promise<AthleteClubCategory[]> {
        return await this.athleteClubCategoryRepository.find({
            where: { fkClubCategory: categoryId },
            relations: ['athlete', 'athlete.sportProfile', 'clubCategory'],
        });
    }

    async update(id: string, updateDto: UpdateAthleteClubCategoryDto): Promise<AthleteClubCategory> {
        const record = await this.findOne(id);
        this.athleteClubCategoryRepository.merge(record, updateDto);
        return await this.athleteClubCategoryRepository.save(record);
    }

    async remove(id: string): Promise<void> {
        const result = await this.athleteClubCategoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`AthleteClubCategory with ID ${id} not found`);
        }
    }
}
