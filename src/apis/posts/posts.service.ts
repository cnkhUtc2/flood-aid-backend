import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PipelineStage, Types } from 'mongoose';
import { COLLECTION_NAMES } from 'src/constants';
import { PostDocument } from './entities/posts.entity';
import { BaseService } from 'src/base/service/base.service';
import { UpdatePostDto } from './dto/update-posts.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { CreatePostDto } from './dto/create-posts.dto';
import { PostType } from './constants';
import { calculateEstimatedReadingTime } from './common/calculate-estimated-reading-time.until';
import { activePublications } from 'src/base/aggregates/active-publications.aggregates';
import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { MediaService } from '../media/medias.service';
import { SentimentsService } from '../sentiments/sentiments.service';

@Injectable()
export class PostsService extends BaseService<PostDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.POST)
        private readonly postModel: ExtendedModel<PostDocument>,
        private readonly mediaService: MediaService,
        private readonly sentimentService: SentimentsService,
    ) {
        super(postModel);
    }

    async getOneByIdForFront(slug: string, options?: Record<string, any>) {
        const filterPipeline: PipelineStage[] = [];
        activePublications(filterPipeline);

        const result = await this.postModel
            .findOne(
                {
                    slug,
                    ...options,
                },
                filterPipeline,
            )
            .exec();

        if (!result) {
            throw new NotFoundException('post_not_found', 'Post not found');
        }

        return result;
    }

    async createByType(
        createPostDto: CreatePostDto,
        type: PostType,
        user: UserPayload,
        featuredImage?: IUploadedMulterFile,
        options?: Record<string, any>,
    ) {
        const { position, longDescription } = createPostDto;

        await this.updatePosition(position, type);

        const estimatedReadingTime =
            calculateEstimatedReadingTime(longDescription);

        const uploadedFiles = await this.mediaService.createFile(
            featuredImage,
            user,
            'posts',
        );

        const newSentiment = await this.sentimentService.model.create(
            createPostDto.sentimentDto,
        );

        const result = await this.postModel.create({
            ...createPostDto,
            ...options,
            type,
            sentiment: newSentiment._id,
            createdBy: user._id,
            estimatedReadingTime,
            featuredImage: uploadedFiles._id,
        });
        return result;
    }

    async updateOneByIdAndType(
        _id: Types.ObjectId,
        type: PostType,
        updatePostDto: UpdatePostDto,
        user: UserPayload,
        options?: Record<string, any>,
    ) {
        const { _id: userId } = user;

        const result = await this.postModel.findOneAndUpdate(
            { _id, type },
            {
                ...updatePostDto,
                ...options,
                updatedBy: userId,
            },
        );

        if (!result) {
            throw new BadRequestException('Post not found');
        }

        return result;
    }

    async deleteManyByIdsAndType(
        _ids: Types.ObjectId[],
        type: string,
        user: UserPayload,
    ) {
        const { _id: userId } = user;
        const data = await this.postModel.find({ _id: { $in: _ids }, type });

        await this.postModel.updateMany(
            { _id: { $in: _ids }, type },
            { deletedAt: new Date(), deletedBy: userId },
        );

        return data;
    }

    private async updatePosition(
        position: number,
        type: PostType,
        thisId?: Types.ObjectId,
    ) {
        if (!position) {
            return;
        }
        const post = await this.postModel
            .findOne({
                position,
                type,
                _id: { $ne: thisId },
            })
            .autoPopulate(false)
            .exec();

        if (post) {
            position++;

            const _post = await this.model.findOneAndUpdate(
                { _id: new Types.ObjectId(post?._id) },
                { position },
            );

            await this.updatePosition(position, _post?.type, _post._id);
        }
    }
}
