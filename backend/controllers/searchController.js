const {client} = require('../sanity');


// @desc Search restaurants
// @route GET /api/search/restaurants
// @access public

const search = async (req, res, next) => {
    // destructuring the query from the request
    const { query } = await req.query;
    console.log(query);
    try {
        const restaurants = await client.fetch(`
        *[_type == 'resturant' && (name match $query || dishes[]->dish match $query )] {
            ...,
             dishes[] {
               ...,
             }
           }
           
      `, { query });
        return res.status(201).json({ restaurants });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }


};

module.exports = search;