import { prop, Ref } from '@typegoose/typegoose';
import { columnSize } from '~shared/constants';
import { BaseEntity } from '~shared/models/base.entity';

import { User } from '../../users/models/user.entity';
import { Task } from './task.entity';

export class Submission extends BaseEntity {
  @prop({
    maxlength: columnSize.length128,
    default: null
  })
  readonly menteeComment: string;
  @prop({
    maxlength: columnSize.length128,
    default: null
  })
  readonly mentorComment: string;
  @prop({ default: false })
  readonly isGraded!: boolean;
  @prop({
    required: true,
    maxlength: columnSize.length128,
    trim: true,
    text: true,
    unique: false
  })
  readonly taskUrl: string;
  @prop({
    min: 0,
    max: 100,
    default: null
  })
  readonly gradePercentage: number;
  @prop({ ref: Task, required: true })
  readonly task: Ref<Task>;
  @prop({ ref: User, required: true })
  readonly mentee: Ref<User>;
  @prop({ ref: User, required: true })
  readonly mentor: Ref<User>;
}
