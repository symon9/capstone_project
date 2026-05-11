import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Member } from '../members/member.entity';
import { Book } from '../books/book.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum BorrowStatus {
  ACTIVE = 'active',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
}

@Entity()
export class Borrow {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @Column({ type: 'uuid' })
  memberId: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ApiProperty({ example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901' })
  @Column({ type: 'uuid' })
  bookId: string;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  borrowDate: Date;

  @ApiProperty({ example: '2025-01-15T00:00:00.000Z' })
  @Column()
  dueDate: Date;

  @ApiProperty({ example: '2025-01-10T00:00:00.000Z', required: false })
  @Column({ nullable: true })
  returnDate: Date;

  @ApiProperty({ enum: BorrowStatus, example: BorrowStatus.ACTIVE })
  @Column({
    type: 'enum',
    enum: BorrowStatus,
    default: BorrowStatus.ACTIVE,
  })
  status: BorrowStatus;
}
