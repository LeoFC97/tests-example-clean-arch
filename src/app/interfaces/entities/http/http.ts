import { PartialI18n } from '../i18n';

interface Query {
  [key: string]: undefined | string | string[] | Query | Query[];
}

interface HttpRequest {
  headers?: Record<string, string | string[] | undefined>;
  params?: Record<string, string>;
  query?: Query;
  body?: unknown;
  i18n: PartialI18n;
  user: HttpRequestUser;
}

interface HttpResponse {
  status: number;
  body?: unknown;
}

interface HttpRequestUser {
  email: string;
  name: string;
}

export {
  HttpRequest, HttpResponse, HttpRequestUser,
};
