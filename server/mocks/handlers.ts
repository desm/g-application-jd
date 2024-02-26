// part of this copied from https://github.com/mswjs/examples/tree/main/examples/with-jest

import { http, graphql, HttpResponse } from 'msw'

export const handlers = [
  http.post('http://localhost/links', ({ request, params, cookies }, res, ctx) => {
    return HttpResponse.json({ success: true, redirect_to: '/products/tsxsi/edit' });
  }),
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
  graphql.query('ListMovies', () => {
    return HttpResponse.json({
      data: {
        movies: [
          {
            title: 'The Lord of The Rings',
          },
          {
            title: 'The Matrix',
          },
          {
            title: 'Star Wars: The Empire Strikes Back',
          },
        ],
      },
    })
  }),
]
