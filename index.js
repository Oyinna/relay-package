const amqplib = require('amqplib');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();


const Services = async (url) => {
    const connection = await amqplib.connect(url);
    const channel = await connection.createChannel();

    return {
        relay: async (reqMsg, reqQueueName, resQueueName, options) => new Promise(async (resolve, reject) => {
            try {
                const resQueue = await channel.assertQueue(resQueueName, options);

                const bReqMes = Buffer.from(JSON.stringify(reqMsg))

                channel.sendToQueue(reqQueueName, bReqMes, {
                    replyTo: resQueue.queue,
                    correlationId: uuid
                })

                channel.consume(resQueue.queue, resMsg => {
                    const jResMsg = JSON.parse(resMsg.content)
                    if (resMsg.properties.correlationId == uuid) {
                        resolve(jResMsg)
                        setTimeout(() => {
                            connection.close();
                            process.exit(0);
                        }, 500);
                    }
                }, { noAck: true });
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = Services;