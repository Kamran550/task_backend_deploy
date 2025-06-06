import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  getDbHost(): string {
    return this.configService.get<string>('DB_HOST', { infer: true }) ?? '';
  }

}
