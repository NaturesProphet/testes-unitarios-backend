import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from './rabbitmq.service';
import { Connection } from 'amqplib';

// Mock da conexão RabbitMQ para os testes
const mockConnection: Partial<Connection> = {};

describe('RabbitMQService', () => {
  let service: RabbitMQService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RabbitMQService,
        { provide: 'rabbitmq', useValue: mockConnection },
      ],
    }).compile();

    service = module.get<RabbitMQService>(RabbitMQService);
  });

  it('Deve consumir uma mensagem de uma fila no RabbitMQ', async () => {
    const mockChannel = {
      assertQueue: jest.fn(),
      consume: jest.fn((queue, callback) =>
        callback({ content: Buffer.from('Test Message') }),
      ),
      ack: jest.fn(),
    };

    // Mock da criação do canal
    mockConnection.createChannel = jest.fn().mockResolvedValue(mockChannel);

    await service.consomeFila('test_queue');

    expect(mockConnection.createChannel).toBeCalledTimes(1);
    expect(mockChannel.assertQueue).toBeCalledWith('test_queue');
    expect(mockChannel.consume).toBeCalledWith(
      'test_queue',
      expect.any(Function),
    );
    expect(mockChannel.ack).toBeCalledTimes(1);
  });

  it('Deve publicar uma mensagem em uma fila do RabbitMQ', async () => {
    const mockChannel = {
      assertQueue: jest.fn(),
      sendToQueue: jest.fn(),
      close: jest.fn(),
    };

    // Mock da criação do canal
    mockConnection.createChannel = jest.fn().mockResolvedValue(mockChannel);

    await service.publica('Test Message', 'test_queue');

    expect(mockConnection.createChannel).toBeCalledTimes(1);
    expect(mockChannel.assertQueue).toBeCalledWith('test_queue');
    expect(mockChannel.sendToQueue).toBeCalledWith(
      'test_queue',
      expect.any(Buffer),
    );
    expect(mockChannel.close).toBeCalledTimes(1);
  });
});
