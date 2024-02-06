import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Menu Categories',
  type: 'document',
  fields: [
      {
        name: "name",
        type: "string",
        title: "Featured Category name",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "short_description",
        type: "string",
        title: "Short Description",
        validation: (Rule) => Rule.max(200),
      },
      {
        name: "resturants",
        type: "array",
        title: "Resturants",
        of: [{type: "reference", to: [{type: "resturant"}]}]
      },
  ],
  
})
