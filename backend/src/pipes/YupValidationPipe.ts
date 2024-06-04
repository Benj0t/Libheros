import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema, ValidationError } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema<any>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value, { abortEarly: false });
      return value;
    } catch (err) {
      if (err instanceof ValidationError) throw new BadRequestException(err.errors);
    }
  }
}
