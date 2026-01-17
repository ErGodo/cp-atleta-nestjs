import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AthleteClubCategoryService } from './athlete-club-category.service';
import { CreateAthleteClubCategoryDto } from './dto/create-athlete-club-category.dto';
import { UpdateAthleteClubCategoryDto } from './dto/update-athlete-club-category.dto';

@Controller('athlete-club-category')
export class AthleteClubCategoryController {
    constructor(private readonly athleteClubCategoryService: AthleteClubCategoryService) { }

    @Post()
    create(@Body() createDto: CreateAthleteClubCategoryDto) {
        return this.athleteClubCategoryService.create(createDto);
    }

    @Get()
    findAll() {
        return this.athleteClubCategoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.athleteClubCategoryService.findOne(id);
    }

    @Get('athlete/:athleteId')
    findByAthlete(@Param('athleteId') athleteId: string) {
        return this.athleteClubCategoryService.findByAthlete(athleteId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateAthleteClubCategoryDto) {
        return this.athleteClubCategoryService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.athleteClubCategoryService.remove(id);
    }
}
