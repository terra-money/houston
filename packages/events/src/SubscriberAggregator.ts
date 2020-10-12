import Subscriber from "./Subscriber";

class SubscriberAggregator {
  subscribers: Subscriber[];
  constructor(initializationOptions) {
    this.subscribers = [];
    this.initializeSubscribers(initializationOptions);
  }

  initializeSubscribers(initializationOptions) {
    let { emitter, logger, muteLogging, subscribers } = initializationOptions;
    if (muteLogging) logger = () => {};
    for (let name in subscribers) {
      this.subscribers.push(
        new Subscriber({
          options: subscribers[name],
          emitter,
          logger,
        })
      );
    }
  }

  updateSubscriberOptions(newOptions) {
    let { logger, muteLogging } = newOptions;
    if (muteLogging) {
      logger = { log: () => {} };
    }
    this.subscribers.forEach((subscriber) => {
      subscriber.updateOptions({
        logger,
      });
    });
  }
}

export default SubscriberAggregator;
