const Services = require('../index');


describe('Queue request on rabbitMQ and provide a callback for a response.', () => {
  test('it should queue request on rabbitMQ and provide a callback for a response.', async (done) => {
    // define required parameters
    const reqMsg = { name: 'Chinyelu' }
    const url = 'amqp://localhost';
    const resQueueName = 'resQueuee';
    const reqQueueName = 'reqQueuee';
    const options = { exclusive: true };
    const service = await Services(url);
    const res = await service.relay(reqMsg, reqQueueName, resQueueName, options)
    expect(res).toEqual(
      expect.any(Object)
    );
    done();
  });
});

