import RelatedAPI from '..Utils/RelatedAPI';
import axios from 'axios'

jest.mock('axios');

test('getRelated retrieves the product information for all of the products realted to the currentProduct and returns it as an array of objects', () => {
  const related = [{currentProductId: 13024}, {currentProductId: 13025}, {currentProductId: 13029}, {currentProductId: 13030}]
  const resp = {data: related}
  axios.get.mockResolvedValue(resp);

  return RelatedAPI.getRelatedProduct


})