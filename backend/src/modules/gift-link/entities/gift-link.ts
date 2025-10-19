import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class GiftLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Index()
  @Column()
  order_id: string;

  @Column({ default: "waiting" })
  status: "waiting" | "redeemed";

  @Column({ nullable: true }) recipient_name: string;
  @Column({ nullable: true }) recipient_phone: string;
  @Column({ nullable: true }) address1: string;
  @Column({ nullable: true }) address2: string;
  @Column({ nullable: true }) city: string;
  @Column({ nullable: true }) postal_code: string;
  @Column({ nullable: true, length: 2 }) country_code: string;

  @Column({ type: "timestamptz", nullable: true }) redeemed_at: Date;

  @Column({ type: "timestamptz", default: () => "now()" }) created_at: Date;
  @Column({ type: "timestamptz", default: () => "now()" }) updated_at: Date;
}
