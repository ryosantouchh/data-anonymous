import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', select: false })
  updatedAt: Date;
}
