import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, MaxLength, Min } from 'class-validator';
import { columnSize } from '~shared/constants';
import { PagedListDto } from '~shared/models/dto';
import { BaseDto } from '~shared/models/dto/base.dto';

import { TrackDto } from '../../../tracks/models/dto/track.dto';

@Exclude()
export class StageDto extends BaseDto {
  @MaxLength(columnSize.length256)
  @IsNotEmpty()
  @Expose()
  title: string;
  @MaxLength(columnSize.length1024)
  @Expose()
  @IsNotEmpty()
  description: string;
  @Expose()
  @Min(0)
  @IsInt()
  @IsOptional()
  taskCount?: number = 1;
  @Expose()
  @Min(0)
  @IsInt()
  level: number;
  @Expose()
  @ApiProperty({ type: TrackDto, readOnly: true })
  @Type(() => TrackDto)
  readonly track: TrackDto;
}
export class PagedListStageDto extends PagedListDto(StageDto) {}
