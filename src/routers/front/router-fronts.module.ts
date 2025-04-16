import { Module } from '@nestjs/common';
import { MediaModule } from 'src/apis/media/medias.module';
import { UserModule } from 'src/apis/users/user.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/apis/auth/auth.module';
import { CategoriesModule } from 'src/apis/categories/categories.module';
import { PostsModule } from 'src/apis/posts/posts.module';
import { MetadataModule } from 'src/apis/metadata/metadata.module';
import { CategoriesController } from 'src/apis/categories/controllers/categories.controller';
import { AuthController } from 'src/apis/auth/controllers/auth.controller';
import { MediaController } from 'src/apis/media/controllers/medias.controller';
import { MetadataController } from 'src/apis/metadata/controllers/metadata.controller';
import { PostsController } from 'src/apis/posts/controllers/posts.controller';
import { UserController } from 'src/apis/users/controllers/user.controller';
import { ConversationController } from 'src/apis/conversations/controllers/conversation.controller';
import { MessageController } from 'src/apis/messages/controllers/message.controller';
import { ConversationModule } from 'src/apis/conversations/conversation.module';
import { MessageModule } from 'src/apis/messages/message.module';
import { TicketModule } from 'src/apis/tickets/ticket.module';
import { SupportTicketController } from 'src/apis/tickets/controllers/ticket.controller';
import { ProfilesModule } from 'src/apis/profiles/profiles.module';
import { ProfilesController } from 'src/apis/profiles/controllers/profiles.controller';
import { MailModule } from 'src/apis/mail/mail.module';
import { DonationsModule } from 'src/apis/donations/donations.module';
import { OrganizationModule } from 'src/apis/organizations/organization.module';
import { OrganizationFundsModule } from 'src/apis/organization-funds/organization-funds.module';
import { ReliefCasesModule } from 'src/apis/relief-cases/relief-cases.module';
import { DonationsController } from 'src/apis/donations/controllers/donations.controller';
import { OrganizationController } from 'src/apis/organizations/controllers/organization.controller';
import { OrganizationFundsController } from 'src/apis/organization-funds/controllers/organization-funds.controller';
import { ReliefCasesController } from 'src/apis/relief-cases/controllers/relief-cases.controller';
import { PaymentGatewayModule } from 'src/apis/payment-gateway/payment-gateway.module';
import { PaymentGatewayController } from 'src/apis/payment-gateway/controllers/payment-gateway.controller';
import { RecipientsModule } from 'src/apis/recipients/recipients.module';
import { RecipientsController } from 'src/apis/recipients/controllers/recipients.controller';
import { DonationItemsModule } from 'src/apis/donation-items/donation-items.module';
import { DonationItemsController } from 'src/apis/donation-items/controllers/donation-items.controller';

@Module({
    imports: [
        CommonModule,
        UserModule,
        MediaModule,
        AuthModule,
        CategoriesModule,
        PostsModule,
        MetadataModule,
        ConversationModule,
        MessageModule,
        TicketModule,
        ProfilesModule,
        MailModule,
        DonationsModule,
        DonationItemsModule,
        OrganizationModule,
        OrganizationFundsModule,
        ReliefCasesModule,
        PaymentGatewayModule,
        RecipientsModule,
    ],
    controllers: [
        UserController,
        MediaController,
        AuthController,
        CategoriesController,
        PostsController,
        MetadataController,
        ConversationController,
        MessageController,
        SupportTicketController,
        ProfilesController,
        DonationsController,
        DonationItemsController,
        OrganizationController,
        OrganizationFundsController,
        ReliefCasesController,
        PaymentGatewayController,
        RecipientsController,
    ],
    providers: [],
})
export class RouterFrontsModule {}
