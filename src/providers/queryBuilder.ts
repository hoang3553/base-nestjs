import _ from 'lodash';

export function queryBuilder(schema) {
  schema.statics.queryBuilder = function (query) {
    let builder;
    let count;
    builder = this.find();
    if (query.filter) {
      builder = builder.where(query.filter);
    }

    if (!query.notPaginate) {
      count = this.count(builder);
    }

    if (query.page && query.perPage) {
      builder = builder.limit(query.perPage);
      builder = builder.skip((query.page - 1) * query.perPage);
    } else if (query.limit) {
      builder = builder.limit(query.limit);
    } else if (query.offset) {
      builder = builder.skip(query.offset);
    }

    if (query.orderBy) {
      builder = builder.sort(query.orderBy);
    }

    if (query.includes) {
      if (_.isArray(query.includes)) {
        for (const po of query.includes) {
          builder = builder.populate(po);
        }
      } else {
        builder = builder.populate(query.includes);
      }
    }

    if (query.select) {
      builder = builder.select(query.select);
    }

    if (count) {
      return Promise.all([builder.lean().exec(), count.exec()]).then(
        (result) => ({
          data: result[0],
          total: result[1],
          page: query.page,
          perPage: query.perPage,
        }),
      );
    }

    return builder.exec();
  };
}
