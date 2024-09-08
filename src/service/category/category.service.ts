import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { ICategory } from 'src/interface/category.interface';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<ICategory>,
  ) {}
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    const newCategory = await new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }
  async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    const existingCategory = await this.categoryModel.findByIdAndUpdate(
      categoryId,
      updateCategoryDto,
      { new: true },
    );
    if (!existingCategory) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    return existingCategory;
  }
  async getAllCategorys(): Promise<ICategory[]> {
    const categoryData = await this.categoryModel.find();
    if (!categoryData || categoryData.length == 0) {
      throw new NotFoundException('Categorys data not found!');
    }
    return categoryData;
  }
  async getCategory(categoryId: string): Promise<ICategory> {
    const existingCategory = await this.categoryModel
      .findById(categoryId)
      .exec();
    if (!existingCategory) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    return existingCategory;
  }
  async deleteCategory(categoryId: string): Promise<ICategory> {
    const deletedCategory =
      await this.categoryModel.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    return deletedCategory;
  }
}
