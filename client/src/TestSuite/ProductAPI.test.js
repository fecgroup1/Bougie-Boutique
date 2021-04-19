import ProductAPI from '../Utils/ProductAPI.js';
import axios from 'axios';

jest.mock('axios');

test('getProduct retrieves the reviews, meta data, and styles for a product and returns it as a product object', () => {
  const related = {related: [13024, 13025, 13030, 13029]};
  const resp = {data: related};
  axios.get.mockResolvedValue(resp);

return ProductAPI.getProduct(13023)
  .then(data => expect(data).toEqual(related));
});