import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
    projectId: 'h5hje36q',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-11-13'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source)=>{
  return  builder.image(source);
}

export default client;