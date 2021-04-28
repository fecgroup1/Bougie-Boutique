import React from 'react';
import { StyledProductCard, StarsDisplay } from '../../Styles/';

const OutfitCard = ({outfit, deleteMe}, theme) => {
  return (
    <StyledProductCard>
      <i class="lni lni-trash"/>

      <div style={{alignSelf: 'center', placeSelf: 'center'}}>
        ...loading
      </div>
      <div style={{borderTop: `1px solid green`, paddingLeft: '.25em', transition: 'background 0.5s'}}>
        <div style={{marginTop: '.2em', marginBottom: 0, backgroundColor: '#cccccc', width: '80%', height: '1em'}}></div>
        <div style={{marginTop: '.1em', backgroundColor: '#cccccc', width: '65%', height: '1em'}}></div>
        <div style={{marginTop: '.1em', backgroundColor: '#cccccc', width: '65%', height: '1em'}}></div>
        <StarsDisplay rating={3}/>
      </div>
    </StyledProductCard>
  )
}

export default OutfitCard