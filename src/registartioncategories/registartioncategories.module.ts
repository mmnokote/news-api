import { Module } from '@nestjs/common';
import { RegistartioncategoriesService } from './registartioncategories.service';
import { RegistartioncategoriesController } from './registartioncategories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registartioncategory } from './entities/registartioncategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registartioncategory])],
  controllers: [RegistartioncategoriesController],
  providers: [RegistartioncategoriesService],
})
export class RegistartioncategoriesModule {}
