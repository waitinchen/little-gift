/**
 * AI 礼物推荐服务
 * 根据对象、预算、场合推荐礼物
 */

interface RecommendInput {
  target: string; // 对象：女生/男生/长辈/朋友/同事
  budget: number; // 预算（元）
  occasion?: string; // 场合：生日/节日/感谢/道歉
}

interface GiftRecommendation {
  productId: string;
  name: string;
  price: number;
  image: string;
  reason: string; // AI 生成的推荐理由
}

export class AIRecommendService {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || "";
  }

  /**
   * AI 礼物推荐
   */
  async recommendGifts(input: RecommendInput): Promise<GiftRecommendation[]> {
    const { target, budget, occasion } = input;

    // TODO: 集成真实的 LLM API
    // 这里提供一个示例实现

    const prompt = `你是一个专业的送礼顾问。请根据以下信息推荐 3-5 份合适的礼物：

对象：${target}
预算：${budget} 元
场合：${occasion || "日常送礼"}

请以 JSON 格式返回，每份礼物包含：
- name: 礼物名称
- price: 价格
- reason: 推荐理由（简短、有温度）`;

    // Mock 响应（生产环境请替换为真实 API 调用）
    const mockRecommendations: GiftRecommendation[] = [
      {
        productId: "gift_001",
        name: "手工香薰礼盒",
        price: 299,
        image: "/images/gifts/incense.jpg",
        reason: "让忙碌的他慢下来，享受片刻宁静 ✨"
      },
      {
        productId: "gift_002",
        name: "创意小夜灯",
        price: 199,
        image: "/images/gifts/lamp.jpg",
        reason: "温暖的光，陷伴每个深夜的梦 🌙"
      },
      {
        productId: "gift_003",
        name: "手绘陶瓷杯",
        price: 159,
        image: "/images/gifts/cup.jpg",
        reason: "每次喝水，都能想到你的心意 ☕"
      }
    ];

    // 根据预算过滤
    return mockRecommendations.filter(g => g.price <= budget);
  }

  /**
   * AI 卡片文案生成
   */
  async generateCard(input: {
    target: string;
    occasion?: string;
    customMessage?: string;
  }): Promise<{
    message: string;
    style: string;
  }> {
    const { target, occasion, customMessage } = input;

    // 语气模板
    const toneTemplates: Record<string, string> = {
      "女生": "给最努力的妳，一点小惊喜，让今天也闪闪发光 ✨",
      "男生": "辛苦啦！小礼物一份，补点能量 🔥",
      "长辈": "感谢您的照顾与教导，这份小心意请笑纳 🙏",
      "同事": "谢谢你的帮忙～这点小礼物希望让你开心一下 😄",
      "朋友": "谢谢你一直在身边，小心意不成敬意 🎁"
    };

    const message = customMessage || toneTemplates[target] || toneTemplates["朋友"];

    return {
      message,
      style: target // 用于前端选择卡片样式
    };
  }
}

export default AIRecommendService;
