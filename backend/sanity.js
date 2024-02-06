const {createClient} = require('@sanity/client');

const client = createClient({
  projectId: 'h5hje36q',
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2023-11-13'
});

module.exports = {client};
