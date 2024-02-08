import { Body, Controller, Get, Post } from '@nestjs/common';
import { WhatsappService } from './app.service';
import { MessageMedia } from 'whatsapp-web.js';

@Controller()
export class AppController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('qr')
  async getQR() {
    const client = this.whatsappService.getQR();
    return client;
  }

  @Post('send-message')
  async sendMessage(
    @Body() body: { numbers: string[]; message: string; image?: string },
  ) {
    const client = this.whatsappService.getClient();
    for (const number of body.numbers) {
      const chat = await client.getChatById('55' + number + '@c.us');
      if (body.image) {
        const base64Image = body.image;
        const image = new MessageMedia('image/png', base64Image);
        await chat.sendMessage(image);
      }
      chat.sendMessage(body.message);
    }
  }
}
