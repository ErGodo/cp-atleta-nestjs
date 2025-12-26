import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AthleteSportProfileService } from '../services/athlete-sport-profile.service';
import { AthleteSportProfile } from './athlete-sport-profile.entity';

@Controller('athlete-sport-profiles')
export class AthleteSportProfileController {
  constructor(private readonly athleteSportProfileService: AthleteSportProfileService) {}

  @Post()
  async create(@Body() athleteSportProfileData: Partial<AthleteSportProfile>): Promise<AthleteSportProfile> {
    return this.athleteSportProfileService.create(athleteSportProfileData);
  }

  @Get()
  async findAll(): Promise<AthleteSportProfile[]> {
    return this.athleteSportProfileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AthleteSportProfile> {
    return this.athleteSportProfileService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<AthleteSportProfile>): Promise<AthleteSportProfile> {
    return this.athleteSportProfileService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.athleteSportProfileService.remove(id);
  }
}