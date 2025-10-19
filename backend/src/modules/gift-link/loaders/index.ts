import { asClass } from "awilix";
import GiftLinkService from "../services/gift-link";

export default async (container: any) => {
  container.register({
    giftLinkService: asClass(GiftLinkService).singleton(),
  });
};
