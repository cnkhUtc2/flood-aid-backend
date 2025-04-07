import { PartialType } from '@nestjs/swagger';
import { CreateReliefCaseDto } from './create-relief-case.dto';

export class UpdateReliefCaseDto extends PartialType(CreateReliefCaseDto) {}
