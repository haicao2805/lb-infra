import { property, hasMany, hasOne } from '@loopback/repository';
import { UserTypes, UserStatuses } from '@/common';
import { UserIdentifier, UserCredential } from '@/models';
import { BaseTzEntity } from '@/base';
import { NumberIdType } from '@/common/types';
import { UserAuthorizeMixin } from '@/mixins';

export class User extends BaseTzEntity<NumberIdType> {
  @property({
    type: 'string',
  })
  realm?: string;

  @property({
    type: 'string',
    default: UserStatuses.UNKNOWN,
    postgresql: {
      columnName: 'status',
      dataType: 'text',
    },
  })
  status: string;

  @property({
    type: 'string',
    default: UserTypes.SYSTEM,
    postgresql: {
      columnName: 'user_type',
      dataType: 'text',
    },
  })
  userType?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'activated_at',
      dataType: 'TIMESTAMP WITH TIME ZONE',
    },
  })
  activatedAt?: Date;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'last_login_at',
      dataType: 'TIMESTAMP WITH TIME ZONE',
    },
  })
  lastLoginAt?: Date;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'parent_id',
    },
  })
  parentId?: number;

  @hasOne(() => User, { keyTo: 'parentId' })
  parent: User;

  @hasMany(() => User, { keyTo: 'parentId' })
  children: User[];

  @hasMany(() => UserIdentifier, { keyTo: 'userId' })
  identifiers: UserIdentifier[];

  @hasMany(() => UserCredential, { keyTo: 'userId' })
  credentials: UserCredential[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export class UserWithAuthorize extends UserAuthorizeMixin(User) {}