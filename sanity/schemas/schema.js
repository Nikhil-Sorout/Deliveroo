import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import category from './category';
import dish from './dish';
import featured from './featured';
import resturant from './resturant';


export default createSchema({
    name : 'default',
    types : schemaTypes.concat([
        resturant,
        featured,
        category,
        dish,
       
    ]),
});

