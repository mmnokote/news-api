import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getTreeRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categoryRepository2 = getTreeRepository(Category);
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async getDescendant(id: number) {
    const parentCategory = this.categoryRepository.findOne(id);

    // findTrees returns root categories with sub categories inside
    const findTrees = await this.categoryRepository2.findTrees();

    // findRoots return the root without child
    const getRoot = await this.categoryRepository2.findRoots();

    // findDescendantsTree return parent and all child of a given category
    const allDescendantTree =
      await this.categoryRepository2.findDescendantsTree(await parentCategory);

    // findDescendants return child without parent of a given category
    const childrenOnly = await this.categoryRepository2.findDescendants(
      await parentCategory,
    );

    // createAncestorsQueryBuilder - Creates a query builder used to get ancestors of the entities in a tree.
    const xxx = await this.categoryRepository2
      .createAncestorsQueryBuilder(
        'category',
        'categoryClosure',
        await parentCategory,
      )
      .leftJoinAndSelect('category.level', 'level')
      .getMany();

    //use createDescendantsQueryBuilder - Creates a query builder used to get descendants of the entities in a tree.
    const ddd = await this.categoryRepository2
      .createDescendantsQueryBuilder(
        'category',
        'categoryClosure',
        await parentCategory,
      )
      .leftJoinAndSelect('category.level', 'level')
      // .andWhere("category.type = 'primary'")
      // .orWhere('category.levelId = :level', { level: leveId })
      .getMany();

    return findTrees;
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
