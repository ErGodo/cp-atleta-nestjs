import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AthleteContactService } from '../services/athlete-contact.service';
import { AthleteContact } from './athlete-contact.entity';

@Controller('athlete-contacts')
export class AthleteContactController {
  constructor(private readonly athleteContactService: AthleteContactService) {}

  @Post()
  async create(@Body() athleteContactData: Partial<AthleteContact>): Promise<AthleteContact> {
    return this.athleteContactService.create(athleteContactData);
  }

  @Get()
  async findAll(): Promise<AthleteContact[]> {
    return this.athleteContactService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AthleteContact> {
    return this.athleteContactService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<AthleteContact>): Promise<AthleteContact> {
    return this.athleteContactService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.athleteContactService.remove(id);
  }
}