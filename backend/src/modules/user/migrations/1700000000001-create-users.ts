import { MigrationInterface, QueryRunner, Table, Index } from "typeorm";

export class CreateUsers1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "password_hash",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "first_name",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "last_name",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "phone",
            type: "varchar",
            length: "20",
            isNullable: true,
          },
          {
            name: "role",
            type: "enum",
            enum: ["customer", "recipient", "admin", "guest"],
            default: "'customer'",
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "avatar_url",
            type: "varchar",
            length: "500",
            isNullable: true,
          },
          {
            name: "metadata",
            type: "json",
            isNullable: true,
          },
          {
            name: "last_login_at",
            type: "timestamptz",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
          },
        ],
      }),
      true
    );

    // 创建索引
    await queryRunner.createIndex(
      "user",
      new Index("IDX_USER_EMAIL", ["email"])
    );

    await queryRunner.createIndex(
      "user",
      new Index("IDX_USER_ROLE", ["role"])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
