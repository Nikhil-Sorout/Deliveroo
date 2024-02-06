import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
      {
        name: "dish",
        type: "string",
        title: "Name of Dish",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "short_description",
        type: "string",
        title: "Short Description",
        validation: (Rule) => Rule.max(200),
      },
      {
        name: "price",
        type: "number",
        title: "Price of the dish",
      },
      {
        name: "image",
        type: "image",
        title: "Image of the dish",
      },
  ],
  
})
