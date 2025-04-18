import { SuperApiProperty } from '@libs/super-core/decorators/super-api-property.decorator';
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { CreateItemDto } from 'src/apis/donation-items/dto/create-item.dto';

export class CreateOrderGHNDto {
    @SuperApiProperty({ required: false, default: 'Sender Name' })
    @IsOptional()
    @IsString()
    from_name?: string;

    @SuperApiProperty({ required: false, default: '0912345678' })
    @IsOptional()
    @IsString()
    from_phone?: string;

    @SuperApiProperty({
        required: false,
        default: '72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam',
    })
    @IsOptional()
    @IsString()
    from_address?: string;

    @SuperApiProperty({ required: false, default: 'Phường 14' })
    @IsOptional()
    @IsString()
    from_ward_name?: string;

    @SuperApiProperty({ required: false, default: 'Quận 10' })
    @IsOptional()
    @IsString()
    from_district_name?: string;

    @SuperApiProperty({ required: false, default: 'HCM' })
    @IsOptional()
    @IsString()
    from_province_name?: string;

    @SuperApiProperty({ default: 'Receiver Name' })
    @IsString()
    to_name: string;

    @SuperApiProperty({ default: '0987654321' })
    @IsString()
    to_phone: string;

    @SuperApiProperty({
        default: '72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam',
    })
    @IsString()
    to_address: string;

    @SuperApiProperty({ default: 'Phường 14' })
    @IsString()
    to_ward_name: string;

    @SuperApiProperty({ default: 'Quận 10' })
    @IsString()
    to_district_name: string;

    @SuperApiProperty({ default: 'HCM' })
    @IsString()
    to_province_name: string;

    @SuperApiProperty({ required: false, default: '0911222333' })
    @IsOptional()
    @IsString()
    return_phone?: string;

    @SuperApiProperty({ required: false, default: '789 C Street' })
    @IsOptional()
    @IsString()
    return_address?: string;

    @SuperApiProperty({ required: false, default: 'Quận 10' })
    @IsOptional()
    @IsString()
    return_district_name?: string;

    @SuperApiProperty({ required: false, default: 'Phường 14' })
    @IsOptional()
    @IsString()
    return_ward_name?: string;

    @SuperApiProperty({ required: false, default: 'HCM' })
    @IsOptional()
    @IsString()
    return_province_name?: string;

    @SuperApiProperty({ required: false, default: 'HCM' })
    @IsOptional()
    @IsString()
    return_district_id?: string;

    @SuperApiProperty({ required: false, default: 'ORDER12345' })
    @IsOptional()
    @IsString()
    client_order_code?: string;

    @SuperApiProperty({ required: false, default: 0 })
    @IsOptional()
    @IsNumber()
    cod_amount?: number;

    @SuperApiProperty({ required: false, default: 'This is a test shipment' })
    @IsOptional()
    @IsString()
    content?: string;

    @SuperApiProperty({ required: false, default: 500 })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @SuperApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    length?: number;

    @SuperApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    width?: number;

    @SuperApiProperty({ required: false, default: 10 })
    @IsOptional()
    @IsNumber()
    height?: number;

    @SuperApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    pick_station_id?: number;

    @SuperApiProperty({ required: false, default: 0 })
    @IsOptional()
    @IsNumber()
    insurance_value?: number;

    @SuperApiProperty({ required: false, default: '' })
    @IsOptional()
    @IsString()
    coupon?: string;

    @SuperApiProperty({ default: 2 })
    @IsNumber()
    service_type_id: number;

    @SuperApiProperty({ default: 1 })
    @IsNumber()
    payment_type_id: number;

    @SuperApiProperty({ required: false, default: 'Please handle with care' })
    @IsOptional()
    @IsString()
    note?: string;

    @SuperApiProperty({ default: 'KHONGCHOXEMHANG' })
    @IsString()
    required_note: string;

    @SuperApiProperty({ required: false, type: [Number], default: [2] })
    @IsOptional()
    @IsArray()
    pick_shift?: number[];

    @SuperApiProperty({ required: false, default: 1713340800 })
    @IsOptional()
    @IsNumber()
    pickup_time?: number;

    @SuperApiProperty({
        required: false,
        type: [CreateItemDto],
    })
    @IsOptional()
    @IsArray()
    items?: CreateItemDto[];

    @SuperApiProperty({ required: false, default: 0 })
    @IsOptional()
    @IsNumber()
    cod_failed_amount?: number;
}
