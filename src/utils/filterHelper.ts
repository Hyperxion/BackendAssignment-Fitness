import { Op, WhereOptions } from 'sequelize';

/**
 * Builds a Sequelize WHERE clause from query parameters.
 *
 * @param query - The query parameters from the request.
 * @param allowedFilters - An array of allowed filter fields.
 * @param searchField - The field to perform full-text search on.
 * @returns A Sequelize WHERE clause.
 */
export const buildWhereClause = (
  query: Record<string, any>,
  allowedFilters: string[],
  searchField?: string,
): WhereOptions => {
  const where: WhereOptions = {};

  // Add filters for allowed fields
  for (const key of allowedFilters) {
    if (query[key] !== undefined) {
      where[key] = query[key];
    }
  }

  if (searchField && query.search) {
    where[searchField] = { [Op.iLike]: `%${query.search}%` }; // PostgreSQL case-insensitive search
  }

  return where;
};
