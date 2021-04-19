const getRelatedAPI = (productIds) => {
  let data = {pids: productIds}
  return fetch('/product/related', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

getRelatedAPI([
  13024,
  13025,
  13030,
  13029
])
.then((data) => {
  console.log(data)
})

export default getRelatedAPI