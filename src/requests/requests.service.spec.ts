import { Test } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { BadGatewayException } from '@nestjs/common';

describe('RequestService', () => {
  let service: RequestsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RequestsService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();
    service = moduleRef.get<RequestsService>(RequestsService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('A classe deve estar instanciada', () => {
    expect(service).toBeDefined();
  });

  describe('sendPOST', () => {
    it('Deve enviar uma requisição POST para uma uri e retornar o body da resposta', async () => {
      const result = { chave: 'valor' };
      const uri = 'http://exemplo.com/v1';
      const data = { chave: 'valor' };
      const postSpy = jest
        .spyOn(httpService, 'post')
        .mockReturnValue(of({ data: result } as any));

      const res = await service.sendPOST(uri, data);
      expect(res).toBe(result);
      expect(postSpy).toHaveBeenCalledWith(uri, data);
    });

    it('Se a chamada falhar, deve cospir um Bad Gateway', async () => {
      const uri = 'amqp://urlIncorreta';
      const data = { chave: 'valor' };
      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(throwError(() => new Error('Erro esperado.')));

      try {
        await service.sendPOST(uri, data);
      } catch (error) {
        expect(error).toBeInstanceOf(BadGatewayException);
      }
    });
  });
});
