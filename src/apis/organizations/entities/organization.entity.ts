import { SuperProp } from '@libs/super-core';
import { AutoPopulate } from '@libs/super-search';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { COLLECTION_NAMES } from 'src/constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
    timestamps: true,
    collection: COLLECTION_NAMES.ORGANIZATION,
})
export class Organization {
    @SuperProp({
        type: String,
        required: true,
    })
    name: string;

    @SuperProp({
        type: String,
        required: true,
    })
    description: string;

    @SuperProp({
        type: String,
        required: true,
    })
    contactEmail: string;

    @SuperProp({
        type: String,
        required: true,
    })
    contactPhone: string;

    @SuperProp({
        type: String,
        required: true,
    })
    location: string;

    @SuperProp({
        type: String,
        required: true,
    })
    websiteUrl: string;

    @SuperProp({
        type: [String],
        default: [],
    })
    socialLinks: string[];

    @SuperProp({
        type: Date,
        required: true,
    })
    establishedDate: Date;
}

export type OrganizationDocument = Organization & Document;
export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.plugin(autopopulateSoftDelete);
