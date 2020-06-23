import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CoursesModule } from './courses/courses.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared';
import configuration from './shared/config/configuration';
import { MailModule } from './shared/mail/mail.module';
import { envValidation } from './shared/validations/env.validation';
import { StagesController } from './stages/stages.controller';
import { StagesModule } from './stages/stages.module';
import { StagesService } from './stages/stages.service';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

export const Config = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: envValidation(),
  expandVariables: true,
  validationOptions: {
    abortEarly: true
  }
});
const Database = MongooseModule.forRoot(configuration().database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
@Module({
  imports: [
    SharedModule,
    AuthModule,
    UsersModule,
    Config,
    Database,
    MailModule,
    ProfileModule,
    TracksModule,
    CoursesModule,
    CategoriesModule,
    StagesModule
  ],

  controllers: [AppController, StagesController],
  providers: [AppService, StagesService]
})
export class AppModule {}
