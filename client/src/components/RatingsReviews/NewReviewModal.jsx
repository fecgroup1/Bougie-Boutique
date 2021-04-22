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

const AddCharRateing = (Characteristic, value) => {
  document.getElementById(Characteristic).innerHTML = CharacteristicDeff[Characteristic][value-1]
}

const generateCharacteristic = (Characteristic)=> {
  return (
    <div style={{'marginTop': '15px'}}><br></br>
      <span> * </span><u>{Characteristic}:</u> <span  style= {{'fontSize': '90%'}} id= {Characteristic}></span><br></br><br></br>
      <label style= {{'fontSize': '85%'}} >{CharacteristicDeff[Characteristic][0]} </label>
      <input required onClick= {(event)=> AddCharRateing( Characteristic, event.target.value) } type="radio" name={Characteristic} value="1" ></input>
      <input onClick= {(event)=> AddCharRateing( Characteristic, event.target.value) } type="radio" name={Characteristic} value="2" ></input>
      <input onClick= {(event)=> AddCharRateing( Characteristic, event.target.value) } type="radio" name={Characteristic} value="3" ></input>
      <input onClick= {(event)=> AddCharRateing( Characteristic, event.target.value) } type="radio" name={Characteristic} value="4" ></input>
      <input onClick= {(event)=> AddCharRateing( Characteristic, event.target.value) } type="radio" name={Characteristic} value="5" ></input>
      <label style= {{'fontSize': '85%'}} > {CharacteristicDeff[Characteristic][4]}</label>
    </div>
  )
}

const NewReviewModal = ({close, isOpen, productName, characteristics})=> {
  return(
     <Modal isOpen= {isOpen} onRequestClose= {()=> close()} style={{
    '-webkit-appearance': 'radio',
    'appearance': 'radio',
    'overlay': {'background':'grey'},
    'content': {'color':'black', 'width': '450px', 'margin':'auto'} }}>
    <span style={{'float': 'right', 'fontSize': '150%'}} onClick= {()=> close()}>&#10006;</span>
    <h2>Write Your Review</h2>
    <h3>About the {productName}</h3>
    <form >
      <label style={{'marginTop': '40px'}} for='starRating'>* Overall Rating:  </label>
      <span style={{'fontFamily': 'FontAwesome'}}id= 'starRating'>
        <label><i class="far fa-star"></i><input required type="radio" name="overallRating" value="1"></input></label>
        <label><i class="far fa-star"></i><input type="radio" name="overallRating" value="2"></input></label>
        <label><i class="far fa-star"></i><input type="radio" name="overallRating" value="3"></input></label>
        <label><i class="far fa-star"></i><input type="radio" name="overallRating" value="4"></input></label>
        <label><i class="far fa-star"></i><input type="radio" name="overallRating" value="5"></input></label>
      </span><br></br><br></br>
      <div style={{'marginTop': '25px'}}>  Would you recomended this product?</div>
      <input type="radio" name="recomended" value="Yes" id= 'yes'></input>
      <label for="yes">Yes</label><br></br>
      <input type="radio" name="recomended" value="No" id= 'no'></input>
      <label for="no">No</label>
      {Object.keys(characteristics).map((key)=> generateCharacteristic(key))}
      <div style={{'marginTop': '40px'}} > Review Summary:  </div><br></br>
      <input type='text' size='50' maxLength= '60' id= 'summary' placeholder= 'Example: Best purchase ever!'></input>
      <div style={{'marginTop': '40px'}} >* Review:  </div><br></br>
      <textarea required minlength= '50' maxLength='1000'  rows='4' cols ='50'placeholder='Why did you like the product or not?'></textarea>
      <div style={{'marginTop': '40px', 'marginBottom': '15px'}}> Upload your photos</div>
      <input type= 'file' accept="image/png, image/jpeg"></input>
      <div style={{'marginTop': '40px'}} >* What is your nickname?</div><br></br>
      <input  required type='text' size='50' maxLength= '60' id= 'userName' placeholder= 'jackson11!'></input>
      <div style= {{'marginTop': '10px','fontSize': '77%'}}>For privacy reasons, do not use your full name or email address.</div>
      <div style={{'marginTop': '40px'}} >* What is your email?</div><br></br>
      <input  required type='email' size='50' maxLength= '60' id= 'email' placeholder= 'jackson11@email.com'></input>
      <div style= {{'marginTop': '10px','fontSize': '77%'}}>For authentication reasons, you will not be emailed.</div>
      <button  style={{'marginTop': '15px'}} type= 'submit'>Submit Review</button>
    </form>
  </Modal>
  )
}

export default NewReviewModal;