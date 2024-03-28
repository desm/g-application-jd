import { encode } from '../client/bundles/formUrlEncoder';

describe('foo', () => {
  it('bar', () => {
    expect(f(dataAllAttributes(), descriptionAsRichText())).toEqual([
      ['link[name]', 'digital product', 'encode'],
      ['link[price_range]', 27, 'encode'],
      ['link[description]', JSON.stringify(descriptionAsRichText()), 'encode'],
    ]);
    expect(encode(f(dataAllAttributes(), descriptionAsRichText()))).toEqual(
      '&link%5Bname%5D=digital%20product&link%5Bprice_range%5D=27&link%5Bdescription%5D=%7B%22doc%22%3A%7B%22type%22%3A%22doc%22%2C%22content%22%3A%5B%7B%22type%22%3A%22heading%22%2C%22attrs%22%3A%7B%22level%22%3A1%7D%2C%22content%22%3A%5B%7B%22type%22%3A%22text%22%2C%22text%22%3A%22Basic%20Tab%20Rich%20Text%22%7D%5D%7D%2C%7B%22type%22%3A%22heading%22%2C%22attrs%22%3A%7B%22level%22%3A2%7D%2C%22content%22%3A%5B%7B%22type%22%3A%22text%22%2C%22text%22%3A%22Some%20content%20here.%22%7D%5D%7D%5D%7D%2C%22selection%22%3A%7B%22type%22%3A%22text%22%2C%22anchor%22%3A1%2C%22head%22%3A1%7D%7D'
    );

    expect(
      encode([
        ['link[name]', 'name value', 'encode'],
        ['link[price_range]', 100, 'encode'],
      ])
    ).toEqual('');
  });
});

function f(dataAllAttributes, descriptionAsRichText) {
  return [
    ['link[name]', dataAllAttributes['name'], 'encode'],
    ['link[price_range]', dataAllAttributes['buy_price'], 'encode'],
    ['link[description]', JSON.stringify(descriptionAsRichText), 'encode'],
  ];
}

function dataAllAttributes() {
  return {
    name: 'digital product',
    buy_price: 27,
  };
}

function descriptionAsRichText() {
  return {
    doc: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
          content: [
            {
              type: 'text',
              text: 'Basic Tab Rich Text',
            },
          ],
        },
        {
          type: 'heading',
          attrs: {
            level: 2,
          },
          content: [
            {
              type: 'text',
              text: 'Some content here.',
            },
          ],
        },
      ],
    },
    selection: {
      type: 'text',
      anchor: 1,
      head: 1,
    },
  };
}
