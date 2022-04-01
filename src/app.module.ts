import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { PostService } from './post.service';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, UserService, PostService, AppResolver],
})
export class AppModule {}
