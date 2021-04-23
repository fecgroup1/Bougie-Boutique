import React, { Fragment, useState, useEffect } from 'react';
import { CompareTable } from '../../Styles';

const Chart = ({product, comparison, theme}) => {

  const [features, setFeatures] = useState(null)

  useEffect(() => {
    if (!!comparison) {
      createComparison(product, comparison)
    }
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


    if (!!comparison) {
      return (
        <Fragment>
          <h2 style={{textAlign: 'center', marginTop: '.25em', color: theme.bluGry}}>Compare Products</h2>
          <CompareTable>
              <thead>
                <th className={'title'}>{product.name}</th>
                <th className={'inner title'}></th>
                <th className={'title'}>{comparison.name}</th>
              </thead>
              <tbody>
                { !!features
                  ?
                    Object.keys(features).map((feature, i) => (
                      <tr key={i}>
                        <td>{features[feature][0]}</td>
                        <td className={'inner'}>{feature}</td>
                        <td>{features[feature][1]}</td>
                      </tr>
                    ))
                  :
                  null
                }
              </tbody>
          </CompareTable>
        </Fragment>
      )
    } else {
      return null
    }
}

export default Chart;