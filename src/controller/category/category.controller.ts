import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { CategoryService } from 'src/service/category/category.service';
@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}
  @Post()
  async createCategory(
    @Res() response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      const newCategory =
        await this.CategoryService.createCategory(createCategoryDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Category has been created successfully',
        newCategory,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Category not created!',
        error: 'Bad Request',
        eerr: err,
      });
    }
  }
  @Put('/:id')
  async updateCategory(
    @Res() response,
    @Param('id') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const existingCategory = await this.CategoryService.updateCategory(
        categoryId,
        updateCategoryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Category has been successfully updated',
        existingCategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getCategorys(@Res() response) {
    try {
      const categoryData = await this.CategoryService.getAllCategorys();
      return response.status(HttpStatus.OK).json({
        message: 'All categories data found successfully',
        categoryData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getCategory(@Res() response, @Param('id') categoryId: string) {
    try {
      const existingCategory =
        await this.CategoryService.getCategory(categoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Category found successfully',
        existingCategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteCategory(@Res() response, @Param('id') categoryId: string) {
    try {
      const deletedCategory =
        await this.CategoryService.deleteCategory(categoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Category deleted successfully',
        deletedCategory,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
