import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Post } from './models/post.model';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => Post)
  async post(@Args('id', { type: () => Int }) id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }
}
