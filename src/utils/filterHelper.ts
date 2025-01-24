import { WhereOptions } from 'sequelize';

/**
 * Builds a Sequelize WHERE clause from query parameters.
 *
 * @param query - The query parameters from the request.
 * @param allowedFilters - An array of allowed filter fields.
 * @returns A Sequelize WHERE clause.
 */
export const buildWhereClause = (
  query: Record<string, any>,
  allowedFilters: string[],
): WhereOptions => {
  const where: WhereOptions = {};

  for (const key of allowedFilters) {
    if (query[key] !== undefined) {
      where[key] = query[key];
    }
  }

  return where;
};
