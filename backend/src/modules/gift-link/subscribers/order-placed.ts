import type { SubscriberArgs } from "@medusajs/medusa";

export default class OrderPlacedSubscriber {
  private giftLinkService: any;
  private orderService: any;

  constructor(container: any) {
    this.giftLinkService = container.resolve("giftLinkService");
    this.orderService = container.resolve("orderService");
    const eventBus = container.resolve("eventBusService");
    eventBus.subscribe("order.placed", this.handle);
  }

  handle = async (data: SubscriberArgs["order.placed"]) => {
    const orderId = data.id;
    // 若已存在 gift link，略过
    const exists = await this.giftLinkService.findByOrder(orderId);
    if (exists) return;
    
    await this.giftLinkService.create({ orderId });

    // 标记订单状态
    try {
      await this.orderService.update(orderId, {
        metadata: { awaiting_recipient_info: true },
      });
    } catch (error) {
      console.error("Failed to update order metadata:", error);
    }
  };
}
