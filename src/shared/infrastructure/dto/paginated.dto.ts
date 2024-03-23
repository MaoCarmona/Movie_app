import { Paginated } from "@app/shared/domain/types";
import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { IsOptional, IsInt, Min, Max, IsString, IsNotEmpty, IsIn } from "class-validator";

export class PaginatedDto implements Paginated {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(500)
  @ApiProperty({
    description: "Number of items to return",
    required: false,
    example: 10,
    default: 10,
  })
  public take: number = 10;

  @IsOptional()
  @Type(() => Number)
  @Max(999999999999999)
  @Min(1)
  @IsInt()
  @ApiProperty({
    description: "Page number to return",
    required: false,
    example: 1,
    default: 1,
  })
  public page: number = 1;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Field to order by",
    required: false,
    example: "id",
  })
  @IsIn(["similarity", "popularity", "actor","duration","year"])
  public categorizeBy?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @IsIn(["ASC", "DESC"])
  @Transform(({ value }): string => value?.toUpperCase())
  @ApiProperty({
    description: "Order of the results",
    required: false,
    example: "ASC",
    enum: ["ASC", "DESC"],
  })
  public order: "ASC" | "DESC" = "ASC";
}
