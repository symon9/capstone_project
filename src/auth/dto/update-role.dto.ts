import { IsEnum } from 'class-validator';
import { UserRole } from '../user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ enum: UserRole, example: UserRole.LIBRARIAN })
  @IsEnum(UserRole)
  role: UserRole;
}
