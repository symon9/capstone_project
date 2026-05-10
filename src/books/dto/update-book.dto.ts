import { PartialType } from '@nestjs/swagger'; //uses swagger's PartialType, not mapped-types
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
