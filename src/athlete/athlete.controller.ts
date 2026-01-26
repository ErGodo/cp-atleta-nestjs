import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { AthleteService } from '../services/athlete.service';
import { Athlete } from './athlete.entity';

@Controller('athletes')
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) { }

  @Post()
  async create(@Body() athleteData: Partial<Athlete>): Promise<Athlete> {
    return this.athleteService.create(athleteData);
  }

  @Get('test-auth')
  @UseGuards(FirebaseAuthGuard)
  testAuth(@Req() req) {
    return { message: 'Authentication successful', user: req.user };
  }

  @Get()
  async findAll(): Promise<Athlete[]> {
    return this.athleteService.findAll();
  }

  @Get('club/:clubId')
  async findByClub(@Param('clubId') clubId: string): Promise<Athlete[]> {
    return this.athleteService.findByClub(clubId);
  }

  @Get('club/:clubId/unassigned')
  async findUnassignedByClub(@Param('clubId') clubId: string): Promise<Athlete[]> {
    return this.athleteService.findUnassignedByClub(clubId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Athlete> {
    return this.athleteService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Athlete>): Promise<Athlete> {
    return this.athleteService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.athleteService.remove(id);
  }
}