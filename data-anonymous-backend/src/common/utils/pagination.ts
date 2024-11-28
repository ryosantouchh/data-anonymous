import { isNaN, isNil } from 'lodash';
import { BadRequestException } from '@nestjs/common';

export const DEFAULT_PAGE = 1;
export const MAX_ITEM_PER_PAGE = 500;
export const DEFAULT_ITEM_PER_PAGE = 10;

export function getPaginationValue({
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_ITEM_PER_PAGE,
}: {
  page?: number;
  pageSize?: number;
}) {
  if (page < 0 || pageSize < 0) {
    throw new BadRequestException('invalid page and pageSize query');
  }

  const preTake =
    isNaN(pageSize) || isNil(pageSize) ? DEFAULT_ITEM_PER_PAGE : pageSize;

  const prePage = isNaN(page) || isNil(pageSize) ? DEFAULT_PAGE : page;

  const take = preTake > MAX_ITEM_PER_PAGE ? MAX_ITEM_PER_PAGE : preTake;

  return {
    skip: (prePage - 1) * take,
    take,
  };
}

export function generatePagination({
  totalCounts,
  take = DEFAULT_ITEM_PER_PAGE,
  skip = 0,
}) {
  return {
    totalCounts,
    page: skip / take + 1,
    pageSize: take,
    totalPages: Math.ceil(totalCounts / take),
  };
}
