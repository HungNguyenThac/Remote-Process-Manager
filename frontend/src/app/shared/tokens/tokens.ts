import { createInjectionToken } from "@shared/utilitys/di";

export const [injectDefaultQuery, provideDefaultQuery] =
  createInjectionToken<string>("default query");

export const [injectDefaultPageSize, provideDefaultPageSize] =
  createInjectionToken<number>("default page size");

export const [injectKindOfGetData, provideKindOfGetData] =
  createInjectionToken<string>("kind of get data");
