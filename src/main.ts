import { NestFactory } from '@nestjs/core';
import { PantheonModule } from './Pantheon.module';

async function bootstrap() {
    const app = await NestFactory.create(PantheonModule);

    app.getHttpAdapter().getInstance().set('json spaces', 2);

    await app.listen(process.env.PORT);
}
bootstrap();
