import { Controller, Get, Header } from '@nestjs/common';

@Controller('metrics')
export class MetricsController {
  @Get('prometheus')
  @Header('Content-Type', 'text/plain; version=0.0.4')
  prometheus() {
    const lines = [
  '# HELP umixpanel_up 1 if the service is up',
  '# TYPE umixpanel_up gauge',
  'umixpanel_up 1'
    ];
    return lines.join('\n');
  }
}
