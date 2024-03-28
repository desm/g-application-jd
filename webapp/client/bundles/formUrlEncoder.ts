/**
 * input is 2D list like this:
 * [
 *     ['link[name]', "name value", 'encode'],
 *     ['link[price_range]', 100, 'encode'],
 * ]
 * 
 * returns encoded form fit for application/x-www-form-urlencoded
 * for example:
 *     &link%5Bname%5D=name%20value&link%5Bprice_range%5D=100
 */
export const encode = (t) => {
  const n = ((e) =>
    e
      .map((e) => {
        switch (e[2]) {
          case 'encode': {
            const [t, i] = e;
            return `${encodeURIComponent(t)}=${encodeURIComponent(i)}`;
          }
          case 'encode_and_join': {
            const [t, i] = e;
            return `${encodeURIComponent(t)}=${i.map((e) => encodeURIComponent(e)).join(',')}`;
          }
          case 'use_raw_value': {
            const [t, i] = e;
            return `${encodeURIComponent(t)}=${i}`;
          }
        }
      })
      .join('&'))(t);
  return n ? `&${n}` : '';
};
