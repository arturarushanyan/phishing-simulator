import { Test, TestingModule } from '@nestjs/testing';
import { PhishingService } from './phishing.service';

describe('PhishingService', () => {
  let service: PhishingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhishingService],
    }).compile();

    service = module.get<PhishingService>(PhishingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
