import React from 'react';



var CharacteristicDeff = {
  Size: ['A size too small', '1/2 size too small', 'Perfect', '1/2 size too big,', 'a size too wide'],
  Width: ['Too narow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too Wide'],
  Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']

};


const Characteristics = ({characteristics}) => {
return (<div>
    {Object.keys(characteristics).map((characteristic)=> {
      var rating = (characteristics[characteristic].value *50) - 50
     return ( <div style={{marginBottom:'50px', width:'250px', borderRadius: '4px'}}>
       <div>{characteristic}</div>
        <i style={{marginLeft:`${rating}px` }}className="lni lni-diamond"></i>
        <div style={{background:'#EEEEEE', width:'250px', height: '7px' }}></div>
        <span style={{fontSize:'90%', marginTop:'5px'}}>{CharacteristicDeff[characteristic][0]}</span>
        <span style={{float: 'right', fontSize:'90%', marginTop:'5px' }}>{CharacteristicDeff[characteristic][4]}</span>
      </div>)
  })}
  </div>)
}






export default Characteristics;
