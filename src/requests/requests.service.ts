import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RequestsService {
  constructor(private readonly httpService: HttpService) {}

  async sendPOST(uri: string, data) {
    let res: AxiosResponse<any, any>;
    try {
      res = await lastValueFrom(this.httpService.post(uri, data));
    } catch (err) {
      throw new BadGatewayException();
    }
    return res.data;
  }
}
