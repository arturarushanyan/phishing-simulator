import { Test, TestingModule } from '@nestjs/testing';
import { PhishingController } from './phishing.controller';

describe('PhishingController', () => {
  let controller: PhishingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhishingController],
    }).compile();

    controller = module.get<PhishingController>(PhishingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
