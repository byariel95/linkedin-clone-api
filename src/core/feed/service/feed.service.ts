import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { PrismaService } from '../../common/services/prisma.service';
import { CreateFeedDto, UpdateFeedDto } from '../dto/feed.dto';
import { PostFeedInterface } from '../interfaces/feed-post.interface';

@Injectable()
export class FeedService 
{
    constructor(private prisma: PrismaService){}

    CreatePostFeed (body: CreateFeedDto): Observable<PostFeedInterface>
    {
        try {
            return from(this.prisma.feedPost.create({data: body}));
        } catch (error) {
            throw new InternalServerErrorException('error to try to create a new feed ');
        }
    }

    FindAllFeed (): Observable<PostFeedInterface[]> 
    {
        return from(this.prisma.feedPost.findMany());

    }

    FindOneFeed (id: number): Observable<PostFeedInterface> 
    {
        return from(this.prisma.feedPost.findUnique({
            where: {
                id
            }
        }));

    }

    UpdatePostFeed (body: UpdateFeedDto, id: number): Observable<PostFeedInterface>
    {
            return from(this.prisma.feedPost.update({
                where:{id},
                data: body
            }));
        
    }

    DeletePostFeed (id: number): Observable<PostFeedInterface>
    {
        
        return from(this.prisma.feedPost.delete({
                where:{id}
        }));
            
    }


}