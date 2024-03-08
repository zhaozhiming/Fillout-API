import { IsBoolean, IsNumber, IsString } from "class-validator";

export class FormFilterDto {
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
