/**
 * searches document for all <div data-...="{...}" id="..." /> elements, parses the data,
 * and returns as a map { "some-id": objA, "other-id", objB, ... }
 */
export const grabAllDataFromDataDivs = () => {
  const data = {};
  document.querySelectorAll('div').forEach((el) => {
    const dataAttr = el.attributes[0];
    if (dataAttr && dataAttr.name.startsWith('data-')) {
      data[el.getAttribute('id')] = JSON.parse(el.getAttribute(dataAttr.name));
    }
  });
  return data;
};
