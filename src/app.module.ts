import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { AuthenticationMiddleware } from './authentication.middleware';

@Module({
  imports: [StudentsModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('*');
  }
}
