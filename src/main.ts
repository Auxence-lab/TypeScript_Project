import { NestFactory } from '@nestjs/core';
import { PantheonModule } from './Pantheon.module';

async function bootstrap() {
    const app = await NestFactory.create(PantheonModule);
    await app.listen(8080);
}
bootstrap();
