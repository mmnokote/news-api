import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async getDescendant(id: number) {
    const parentCategory = this.categoryRepository.findOne(id);
    const trees = await this.categoryRepository.manager
      .getTreeRepository(Category)
      .findDescendantsTree(await parentCategory, { depth: 1 });
    return trees;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async seedCategory() {
    const a1 = new Category();
    a1.name = 'a1';
    await this.categoryRepository.save(a1);

    const a11 = new Category();
    a11.name = 'a11';
    a11.parent = a1;
    await this.categoryRepository.save(a11);

    const a12 = new Category();
    a12.name = 'a12';
    a12.parent = a1;
    await this.categoryRepository.save(a12);

    const a111 = new Category();
    a111.name = 'a111';
    a111.parent = a11;
    await this.categoryRepository.save(a111);

    const a112 = new Category();
    a112.name = 'a112';
    a112.parent = a11;
    await this.categoryRepository.save(a112);
    return 'completed';
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
