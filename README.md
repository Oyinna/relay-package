## Introduction
This is a package that makes it easy for you to queue a message on rabbitMQ and provide a callback for a response in your node.js app.

## Example
``` const Queue = require('relay-rabbitmq');

const UsersController = {
    create: async (req, res) => {
        try {
           
            // define required parameters
            const reqMsg = req.body;
            const url = 'amqp://localhost';
            const resQueueName = 'resQueuee';
            const reqQueueName = 'reqQueuee';
            const options = { exclusive: true };

            const mqConnection = await Queue(url);
            const res = await Queue.relay(reqMsg, reqQueueName, resQueueName, options)

            return res.status(201).send({
                success: true,
                data: res,
            });
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: 'Something went wrong!',
            });
        }
    },
};

module.exports = UsersController;

```

Usage
Usage is a straight process. First, define the following parameters

reqMsg = the request body;
url = the RabbitMQ url;
resQueueName = the name of your response queue;
reqQueueName = the name of your rrquest queue;
options = the channel options eg { exclusive: true };

Call the Queue function passing in the rabbitMQ url to establish rabbitMQ connection.

``` const mqConnection = await Queue(url)```

Call the Queue.relay function passing in the request, request queue name, response queue name and the option parameter.

```const res = await Queue.relay(reqMsg, reqQueueName, resQueueName, options)```

res is the response returned from the response queue.

