import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export default class PushMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id = undefined;

  @Column({
    type: "varchar",
    length: 255,
    unique: true
  })
  uid = "";

  @Column({
    type: "varchar",
    length: 200,
    unique: false
  })
  ip = "";

  @CreateDateColumn()
  createdDate = "";
}
