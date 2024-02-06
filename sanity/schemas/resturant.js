import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resturant',
  title: 'Resturant',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Resturant name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Image of the resturant",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of the resturant",
    },
    {
      name: "long",
      type: "string",
      title: "Longitude of the resturant",
    },
    {
      name: "address",
      type: "string",
      title: "Resturant address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a rating from (1-5 stars)",
      validation: (Rule) => Rule.required() .min(1) .max(5) .error("Please enter a value between 1 and 5"),
    },
    {
      name: "type",
      type: "reference",
      title: "Category",
      validation: (Rule) => Rule.required(),
      to: [{type: "category"}],
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{type: "reference", to:[{type: "dish"}]}]
    }

  ],

})
