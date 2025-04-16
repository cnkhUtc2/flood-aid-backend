import { ExtendedInjectModel } from '@libs/super-core';
import { ExtendedModel } from '@libs/super-core/interfaces/extended-model.interface';
import { Inject, Injectable } from '@nestjs/common';
import { COLLECTION_NAMES } from 'src/constants';
import { DonationItemDocument } from './entities/donaion-item.entity';
import { BaseService } from 'src/base/service/base.service';
import { UpdateDonationItemDto } from './dto/update-donation-item.dto';
import { UserPayload } from 'src/base/models/user-payload.model';
import { Types } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { htmlContent } from '../mail/html/donate-item-notification';
import { UserService } from '../users/user.service';

@Injectable()
export class DonationItemsService extends BaseService<DonationItemDocument> {
    constructor(
        @ExtendedInjectModel(COLLECTION_NAMES.DONATION_ITEM)
        private readonly donationItemModel: ExtendedModel<DonationItemDocument>,
        private readonly userService: UserService,
        @Inject('MAIL_SERVICE') private readonly client: ClientProxy,
    ) {
        super(donationItemModel);
    }

    async updateOne(
        id: Types.ObjectId,
        donationItem: UpdateDonationItemDto,
        user: UserPayload,
    ) {
        const result = await this.updateOneById(
            new Types.ObjectId(id),
            donationItem,
            user,
        );

        const existingDonationItem = await this.donationItemModel
            .findById(id)
            .exec();

        const donor = await this.userService.getById(
            existingDonationItem.createdBy._id.toString(),
        );

        const { email } = donor;

        if (result.status === 'accepted') {
            const message = {
                email,
                subject: 'Thank You for Your Generous Donation',
                text: `Dear Supporter, Thank you for your generous donation.`,
                html: htmlContent,
            };

            await this.client.emit('send_email', message);
        }
    }
}
