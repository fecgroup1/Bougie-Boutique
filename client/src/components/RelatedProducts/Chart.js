import React, { useState, useEffect } from 'react'

const Chart = ({product, comparison}) => {

  const [features, setFeatures] = useState(null)

  useEffect(() => {
    createComparison(product, comparison)
  }, [comparison])

  const createComparison = (curr, comp) => {
    let result = {};

    curr.features.forEach((item) => {
      result[item.feature] = [item.value, 'n/a']
    })

    comp.features.forEach((item) => {
      if (result[item.feature]) {
        result[item.feature][1] = item.value
      } else {
        result[item.feature] = ['n/a', item.value]
      }
    })
    setFeatures(result)
  }

  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            <th>Current Product</th>
            <th>Feature</th>
            <th>Comparison Product</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>{product.name}</th>
            <th></th>
            <th>{comparison.name}</th>
          </tr>
        </thead>
        <tbody>
          { !!features
            ?
              Object.keys(features).map((feature, i) => (
                <tr key={i}>
                  <td>{features[feature][0]}</td>
                  <td>{feature}</td>
                  <td>{features[feature][1]}</td>
                </tr>
              ))
            :
            null
          }
        </tbody>
      </table>
    </StyledTable>
  )
}

export default Chart;