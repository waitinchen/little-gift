import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGiftLinks1700000000000 implements MigrationInterface {
  name = "CreateGiftLinks1700000000000";

  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE IF NOT EXISTS "gift_link" (
        "id"              SERIAL PRIMARY KEY,
        "token"           varchar(64) UNIQUE NOT NULL,
        "order_id"        varchar(64) NOT NULL,
        "status"          varchar(32) NOT NULL DEFAULT 'waiting',
        "recipient_name"  varchar(255),
        "recipient_phone" varchar(64),
        "address1"        varchar(255),
        "address2"        varchar(255),
        "city"            varchar(128),
        "postal_code"     varchar(32),
        "country_code"    varchar(2),
        "redeemed_at"     timestamptz,
        "created_at"      timestamptz DEFAULT now(),
        "updated_at"      timestamptz DEFAULT now()
      );
    `);
    await q.query(`CREATE INDEX IF NOT EXISTS "idx_gift_link_order" ON "gift_link" ("order_id");`);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS "gift_link";`);
  }
}
