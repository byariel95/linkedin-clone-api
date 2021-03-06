import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { PrismaService } from '../../database/database.service';
import { CreateFeedDto, UpdateFeedDto } from '../../common/dtos/feed.dto';
import { PostFeed } from '../../../domain/models';

@Injectable()
export class FeedService 
{
    constructor(private prisma: PrismaService){}

    CreatePostFeed (body: CreateFeedDto): Observable<Partial<PostFeed>>
    {
        try {
            return from(this.prisma.feedPost.create({data: body}));
        } catch (error) {
            throw new InternalServerErrorException('error to try to create a new feed ');
        }
    }

    FindAllFeed (): Observable<Partial<PostFeed[]>> 
    {
        return from(this.prisma.feedPost.findMany());

    }


    FindFeed (take : number=10 , skip : number =0): Observable<Partial<PostFeed[]>> 
    {
        return from(this.prisma.feedPost.findMany({
            skip,
            take,
            
        }));

    }


    FindOneFeed (id: number): Observable<Partial<PostFeed>> 
    {
        return from(this.prisma.feedPost.findUnique({
            where: {
                id
            }
        }));

    }

    UpdatePostFeed (body: UpdateFeedDto, id: number): Observable<Partial<PostFeed>>
    {
        return from(this.prisma.feedPost.update({
                where:{id},
                data: body
        }));
        
    }

    DeletePostFeed (id: number): Observable<Partial<PostFeed>>
    {
        
        return from(this.prisma.feedPost.delete({
                where:{id}
        }));
            
    }


}
