import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id = undefined;

  @Column({
    type: "varchar",
    length: 200,
  })
  title = "";

  @Column("text")
  text = "";

  @Column({
    type: "text",
    default: "",
  })
  name = "";

  @Column({
    type: "varchar",
    default: "",
  })
  description = "";

  @UpdateDateColumn()
  updatedDate = "";

  @CreateDateColumn()
  createdDate = "";

  constructor(props = {}) {
    super(props);
    const { title, text, categories, description, name } = props;
    this.title = title;
    this.text = text;
    this.name = name;
    this.description = description;
    this.categories = categories;
  }
  static getByTitle(title = "") {
    console.log(this.name);
    return this.createQueryBuilder(this.name).getMany();
  }
}
