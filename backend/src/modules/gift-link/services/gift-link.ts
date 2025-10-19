import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager, Repository } from "typeorm";
import { GiftLink } from "../entities/gift-link";
import { v4 as uuid } from "uuid";

type CreateInput = { 
  orderId: string;
  senderId?: number;
  recipientId?: number;
};
type RedeemInput = {
  token: string;
  recipient_name: string;
  recipient_phone?: string;
  address1: string;
  address2?: string;
  city?: string;
  postal_code?: string;
  country_code?: string;
};

export default class GiftLinkService extends TransactionBaseService {
  private manager_: EntityManager;
  private giftRepo_: Repository<GiftLink>;

  constructor(container: any) {
    // @ts-ignore
    super(container);
    this.manager_ = container.manager;
    this.giftRepo_ = container.manager.getRepository(GiftLink);
  }

  async create({ orderId, senderId, recipientId }: CreateInput): Promise<GiftLink> {
    const token = uuid().replace(/-/g, "");
    const gl = this.giftRepo_.create({ 
      token, 
      order_id: orderId, 
      status: "waiting",
      sender_id: senderId,
      recipient_id: recipientId
    });
    return await this.giftRepo_.save(gl);
  }

  async findByOrder(orderId: string): Promise<GiftLink | null> {
    return await this.giftRepo_.findOne({ where: { order_id: orderId } });
  }

  async findByToken(token: string): Promise<GiftLink | null> {
    return await this.giftRepo_.findOne({ where: { token } });
  }

  async redeem(input: RedeemInput): Promise<GiftLink> {
    const gl = await this.findByToken(input.token);
    if (!gl) throw new Error("Invalid gift token");
    if (gl.status === "redeemed") return gl;

    gl.recipient_name = input.recipient_name;
    gl.recipient_phone = input.recipient_phone;
    gl.address1 = input.address1;
    gl.address2 = input.address2;
    gl.city = input.city;
    gl.postal_code = input.postal_code;
    gl.country_code = input.country_code || "TW";
    gl.status = "redeemed";
    gl.redeemed_at = new Date();
    gl.updated_at = new Date();
    return await this.giftRepo_.save(gl);
  }
}
