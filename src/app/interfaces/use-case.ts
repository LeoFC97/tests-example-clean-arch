import { PartialI18n } from './i18n';

/* eslint-disable @typescript-eslint/no-explicit-any */
abstract class UseCase {
  abstract execute(input: unknown, i18n?: PartialI18n): Promise<any>;
}

export default UseCase;
