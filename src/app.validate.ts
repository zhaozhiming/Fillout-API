import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ParamFormFilter {
  @IsString()
  @IsNotEmpty()
  formId: string;
}

export class QueryFormFilter {
  @IsNumber()
  limit: number;

  @IsString()
  afterDate: string;

  @IsString()
  beforeDate: string;

  @IsString()
  status: string;

  @IsBoolean()
  includeEditLink: boolean;

  @IsString()
  sort: string;

  @IsString()
  filters: string;
}
