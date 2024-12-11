import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerController } from './mailer.controller';
import { MMailerService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: '',
          pass: '',
        },
      },
    }),
  ],
  controllers: [MailerController],
  providers: [MMailerService],
  exports: [MMailerService],
})
export class MMailerModule {}
