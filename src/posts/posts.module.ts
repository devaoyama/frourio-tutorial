import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [],
  providers: [PostsResolver, PrismaService],
})
export class PostsModule {}
