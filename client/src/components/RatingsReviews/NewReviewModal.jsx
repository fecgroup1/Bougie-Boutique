import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#app');



var CharacteristicDeff = {
    Size: ['A size too small', '1/2 size too small', 'Perfect', '1/2 size too big,', 'a size too wide'],
    Width: ['Too narow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too Wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']

  };

const generateCharacteristic = (Characteristic)=> {
  return (
    <div><br></br>
      <span> * </span><u>{Characteristic}:</u> <br></br><br></br>
      <label style= {{'fontSize': '85%'}} for= 'least'>{CharacteristicDeff[Characteristic][0]} </label>
      <input type="radio" name={Characteristic} value="1" id='least' ></input>
      <input type="radio" name={Characteristic} value="2" ></input>
      <input type="radio" name={Characteristic} value="3" ></input>
      <input type="radio" name={Characteristic} value="4" ></input>
      <input type="radio" name={Characteristic} value="5" id= 'most' ></input>
      <label style= {{'fontSize': '85%'}} for= 'most'> {CharacteristicDeff[Characteristic][4]}</label>
    </div>
  )
}

const NewReviewModal = ({close, isOpen, productName, characteristics})=> {
  return(
     <Modal isOpen= {isOpen} onRequestClose= {()=> close()} style={{
    'overlay': {'background':'grey'},
    'content': {'color':'black' } }}>
    <span style={{'float': 'right', 'fontSize': '150%'}} onClick= {()=> close()}>&#10006;</span>
    <h2>Write Your Review</h2>
    <h4>About the {productName}</h4>
    <form >
      <label for='starRating'>* Overall Rating:  </label>
      <span id= 'starRating'>
        <input type="radio" name="overallRating" value="1"></input>
        <input type="radio" name="overallRating" value="2"></input>
        <input type="radio" name="overallRating" value="3"></input>
        <input type="radio" name="overallRating" value="4"></input>
        <input type="radio" name="overallRating" value="5"></input>
      </span><br></br><br></br>
      <div>  Would you recomended this product?</div>
      <input type="radio" name="recomended" value="Yes" id= 'yes'></input>
      <label for="yes">Yes</label><br></br>
      <input type="radio" name="recomended" value="No" id= 'no'></input>
      <label for="no">No</label><br></br><br></br>

      {Object.keys(characteristics).map((key)=> generateCharacteristic(key))}

    </form>
  </Modal>
  )
}

export default NewReviewModal;