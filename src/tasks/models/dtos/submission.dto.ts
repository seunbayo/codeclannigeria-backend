import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsUrl, Max, MaxLength, Min } from 'class-validator';
import { columnSize } from '~shared/constants';
import { BaseDto, PagedListDto } from '~shared/models/dto';

export class SubmissionDto extends BaseDto {
    @MaxLength(columnSize.length128)
    @IsOptional()
    @Expose()
    menteeComment?: string;
    @MaxLength(columnSize.length128)
    @IsOptional()
    @Expose()
    mentorComment?: string;
    @IsUrl()
    @Expose()
    taskUrl: string;
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(100)
    @Expose()
    gradePercentage: number;
}

export class PagedListSubmissionDto extends PagedListDto(SubmissionDto) { }
