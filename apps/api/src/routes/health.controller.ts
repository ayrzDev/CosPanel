import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/health')
  health() {
    return { status: 'ok', ts: new Date().toISOString() };
  }

  @Get('/metrics/prometheus')
  metrics() {
    // Minimal fake metrics compatible with Prometheus exposition
    const lines = [
  '# HELP umixpanel_up 1 if the service is up',
  '# TYPE umixpanel_up gauge',
  'umixpanel_up 1'
    ];
    return lines.join('\n');
  }
}
