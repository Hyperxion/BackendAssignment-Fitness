// src/utils/paginationHelper.ts
import { FindAndCountOptions, Model } from 'sequelize';

export interface PaginationMeta {
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Helper function to implement pagination for Sequelize models.
 *
 * @param model - The Sequelize model to query.
 * @param options - Options for filtering, sorting, etc.
 * @param page - The current page number.
 * @param limit - The number of items per page.
 * @returns A paginated response object.
 */
export const paginate = async <T extends Model>(
  model: { new (): T } & typeof Model, // this way model is not abstract but concrete instance
  options: FindAndCountOptions = {},
  page: number = 1,
  limit: number = 10,
): Promise<PaginationResponse<T>> => {
  const offset = (page - 1) * limit;

  const { rows: data, count: total } = await model.findAndCountAll({
    ...options,
    limit,
    offset,
  });

  return {
    data,
    meta: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    },
  };
};
