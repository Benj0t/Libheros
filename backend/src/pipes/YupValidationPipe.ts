import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AnyObjectSchema, ValidationError } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: AnyObjectSchema) {}

  async transform(value: unknown): Promise<unknown> {
    try {
      await this.schema.validate(value, { abortEarly: false });
      return value;
    } catch (err) {
      if (err instanceof ValidationError) throw new BadRequestException(err.errors);
      throw err;
    }
  }
}
