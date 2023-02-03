import { IsUUID } from 'class-validator';

export class QueryParams {
  @IsUUID()
  id: string;
}
