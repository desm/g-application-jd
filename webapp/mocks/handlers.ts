// part of this copied from https://github.com/mswjs/examples/tree/main/examples/with-jest

import { rest, graphql } from 'msw'

export const handlers = [
  rest.post('http://localhost/links', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ success: true, redirect_to: '/products/tsxsi/edit' }),
    )
  }),
  // rest.get('https://api.example.com/user', () => {
  //   return HttpResponse.json({
  //     firstName: 'John',
  //     lastName: 'Maverick',
  //   })
  // }),
  // graphql.query('ListMovies', () => {
  //   return HttpResponse.json({
  //     data: {
  //       movies: [
  //         {
  //           title: 'The Lord of The Rings',
  //         },
  //         {
  //           title: 'The Matrix',
  //         },
  //         {
  //           title: 'Star Wars: The Empire Strikes Back',
  //         },
  //       ],
  //     },
  //   })
  // }),
]
