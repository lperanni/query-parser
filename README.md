# Query Parser

![Travis](https://img.shields.io/travis/com/lperanni/query-parser)
![License](https://img.shields.io/npm/l/@lperanni/query-parser)
![Size](https://img.shields.io/bundlephobia/min/@lperanni/query-parser)

This Express query-parser/mapper provides middleware functions that parse the request query written wth a specific syntax and enable easier filtering of resources on the backend.
The operations are modeled after Sequelize's operators, but mappers for other ORM's or custom solutions can be easily added as the base parser is library-agnostic

## Installation

    npm install @lperanni/query-parser

## Usage

Let's assume a request query targeting the 'User' resource with the following query object

    {
      limit: '6',
      offset: '0',
      name: 'ts.UserOne',
      randomParam: 'thisisnotpartofthelang',
      notSupportedOperation: 'op.Test',
      id: 'in.9,8,7,6',
      available: 'eq.false',
      created_at: 'lte.20/07/2020'
    };

In this case we'll assume an Express Rest Api with Sequelize as it's ORM library 

    const { sequelizeMapper } = require('@lperanni/query-parser')

    router.get('/user', sequelizeMapper , (req, res, next) => {
      const { operations, limit, offset } = req.query;
      User.findAll({ 
        limit,
        offset,
        where: operations
      })
    }));

What happens in the background is that the sequelizeMapper takes the object and parses all keys with operations supported by this package and adds them to req.query.operations transformed into the appropriate operators. So the above query object turns into this:

    {
      limit: '6',
      offset: '0',
      randomParam: 'thisisnotpartofthelang',
      notSupportedOperation: 'op.Test',
      operations: {
        name: { [Op.iLike]: '%Text%' },
        id: [9,8,7,6],
        available: { [Op.eq]: false },
        startDate: { [Op.lte]: '20/07/2020' }
      }
    }
The following is a list of supported operations

    const supportedOperations = [
      'ts',   //text search
      'eq',   // equals
      'ne',   // not equal
      'lt',   // less than
      'in',   
      'lte',  // less than or equal
      'gt',   // greater than 
      'gte',  // greater than or equal
      'between',
      'like',
      'notLike',
      'iLike',
      'notILike',
      'is',
      'not',
      'or',
      'notBetween',
      'startsWith',
      'endsWith',
      'substring',
      'regexp',
      'notRegexp',
      'iRegexp',
      'notIRegexp'
    ];

If you want/need to use this package to map custom operations to the functions all you need to do is write a custom mapper and pass it as a param
to the baseMapper function

    const { base } = require('@lperanni/query-parser');
    const { customMapper } = require('../lib')

    const customMiddleware = base(customMapper);

    router.get('/user', customMiddleware , (req, res, next) => { ...

## Contributions

Any contributions are welcome. If you want to support this package by contributing fixes and changes then fork it, create a new branch and submit a Pull Request and i will try to check it as soon as possible

## License

ISC