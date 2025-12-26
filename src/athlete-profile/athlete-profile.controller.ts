import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AthleteProfileService } from '../services/athlete-profile.service';
import { AthleteProfile } from './athlete-profile.entity';

@Controller('athlete-profiles')
export class AthleteProfileController {
  constructor(private readonly athleteProfileService: AthleteProfileService) {}

  @Post()
  async create(@Body() athleteProfileData: Partial<AthleteProfile>): Promise<AthleteProfile> {
    return this.athleteProfileService.create(athleteProfileData);
  }

  @Get()
  async findAll(): Promise<AthleteProfile[]> {
    return this.athleteProfileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AthleteProfile> {
    return this.athleteProfileService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<AthleteProfile>): Promise<AthleteProfile> {
    return this.athleteProfileService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.athleteProfileService.remove(id);
  }
}