import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    const categories = await this.prisma.bookmarkCategory.findMany();

    return categories;
  }

  async createCategory(
    creatorId: string,
    name: string,
    backgroundColor: string,
    textColor: string,
  ) {
    const category = await this.prisma.bookmarkCategory.create({
      data: {
        creatorId,
        name,
        backgroundColor,
        textColor,
      },
    });

    return category;
  }

  async deleteCategory(id: number) {
    await this.prisma.bookmark.updateMany({
      where: { categoryId: id },
      data: {
        categoryId: null,
      },
    });

    await this.prisma.bookmarkCategory.delete({
      where: { id: id },
    });

    return 'Deleted!';
  }
}
