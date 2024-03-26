import { PaginatedDto } from "@app/shared/infrastructure/dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class findAllDto extends PaginatedDto {
  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public actor?: string;

  @IsString()
  @IsOptional()
  public threshold?: number;
}
export class findByTitleDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
