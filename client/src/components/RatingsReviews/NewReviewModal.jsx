import React, {useState}from 'react';
import Modal from 'react-modal';
import ClickableStars from './ClickableStars'
import axios from 'axios';



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

const NewReviewModal = ({close, isOpen, productName, characteristics, productId, setMeta, setReviews})=> {

  const [starStyles, setstarStyles] = useState({
    one: {},
    two: {},
    three: {},
    four: {},
    five: {}
  })

  const highlightStars= (value)=>{
    if (value === '1'){
      setstarStyles({
        one: { 'color': '#FFD966'},
        two: {},
        three: {},
        four: {},
        five: {}
      })
    } else if(value === '2'){
      setstarStyles({
        one: { 'color': '#FFD966'},
        two: {'color': '#FFD966'},
        three: {},
        four: {},
        five: {}
      })
    }else if(value === '3'){
      setstarStyles({
        one: { 'color': '#FFD966'},
        two: {'color': '#FFD966'},
        three: {'color': '#FFD966'},
        four: {},
        five: {}
      })
    }else if(value === '4'){
      setstarStyles({
        one: { 'color': '#FFD966'},
        two: {'color': '#FFD966'},
        three: {'color': '#FFD966'},
        four: {'color': '#FFD966'},
        five: {}
      })}else if(value === '5'){
        setstarStyles({
          one: { 'color': '#FFD966'},
          two: {'color': '#FFD966'},
          three: {'color': '#FFD966'},
          four: {'color': '#FFD966'},
          five: {'color': '#FFD966'}
        })}
  }


  const submitReview = (currentProductId) => {
    currentProductId=currentProductId.productId
    event.preventDefault();
    let form = document.querySelector('form[name="NewReview"]');
    if(form.elements['photos'].files[0]){
      var photos = [];
      var calls =[];
      for(var i=0; i< form.elements['photos'].files.length; i++){
        let formData = new FormData()
        formData.append('image', form.elements['photos'].files[i]);
        calls.push(axios.post('/addPhoto', formData, {'Content-Type': 'multipart/form-data'})
          .then(res=> {
            var photoURL= res.data
            photos.push(photoURL)
          }))
      }

      Promise.all(calls).then(()=>{
        let obj= {};
        for (var key in characteristics) {
          obj[characteristics[key]['id']] = Number(form.elements[key].value)
        };
          axios.post(`/reviews`, {
            product_id: Number(currentProductId),
            rating: Number(form.elements['overallRating'].value),
            summary: document.getElementById('summary').value,
            body: document.getElementById('body').value,
            recommend: (form.elements['recomended'].value)=== "true"? true : false,
            name: document.getElementById('userName').value,
            email: document.getElementById('email').value,
            photos: photos,
            characteristics: obj
          }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
          .then(() => {
            setMeta(productId);
            setReviews(productId)
          })
          .catch((err) => {
            console.log(err)
          })
          close();
        })

    }else{
      let obj= {};
        for (var key in characteristics){
          obj[characteristics[key]['id']] = Number(form.elements[key].value)
        }
      axios.post(`/reviews`, {
        product_id: Number(currentProductId),
        rating: Number(form.elements['overallRating'].value),
        summary: document.getElementById('summary').value,
        body: document.getElementById('body').value,
        recommend: (form.elements['recomended'].value)=== "true"? true : false,
        name: document.getElementById('userName').value,
        email: document.getElementById('email').value,
        characteristics: obj
      }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
      .then(() => {
        setMeta(productId);
        setReviews(productId)
      })
      .catch((err) => {
        console.log(err)
      })
      close();
    }
  }


  return(
     <Modal key={productId} isOpen= {isOpen} onRequestClose= {()=> close()} style={{
    'overlay': {'background':'grey'},
    'content': {'color':'black', 'width': '450px', 'margin':'auto'} }}>
    <span style={{'float': 'right', 'fontSize': '150%'}} onClick= {()=> close()}>&#10006;</span>
    <h2>Write Your Review</h2>
    <h3>About the {productName}</h3>
    <form name = 'NewReview' onSubmit= {()=> submitReview({productId})}>
      <label style={{'marginTop': '40px'}} for='starRating'>* Overall Rating:  </label>
      <ClickableStars starStyles= {starStyles} highlightStars= {highlightStars}/>
      <br></br><br></br>
      <div style={{'marginTop': '25px'}}>  Would you recomended this product?</div>
      <input type="radio" name="recomended" value='true' id= 'yes'></input>
      <label for="yes">Yes</label><br></br>
      <input type="radio" name="recomended" value='false' id= 'no'></input>
      <label for="no">No</label>
      {Object.keys(characteristics).map((key)=> generateCharacteristic(key))}
      <div style={{'marginTop': '40px'}} > Review Summary:  </div><br></br>
      <input name = 'surmmary' type='text' size='50' maxLength= '60' id= 'summary' placeholder= 'Example: Best purchase ever!'></input>
      <div style={{'marginTop': '40px'}} >* Review:  </div><br></br>
      <textarea id='body' required minLength= '50' maxLength='1000'  rows='4' cols ='50'placeholder='Why did you like the product or not?'></textarea>
      <div style={{'marginTop': '40px', 'marginBottom': '15px'}}> Upload your photos</div>
      <input id='photos' type= 'file' accept="image/png, image/jpeg" multiple></input>
      <div style={{'marginTop': '40px'}} >* What is your nickname?</div><br></br>
      <input name= 'userName' required type='text' size='50' maxLength= '60' id= 'userName' placeholder= 'jackson11!'></input>
      <div style= {{'marginTop': '10px','fontSize': '77%'}}>For privacy reasons, do not use your full name or email address.</div>
      <div style={{'marginTop': '40px'}} >* What is your email?</div><br></br>
      <input name= 'email' required type='email' size='50' maxLength= '60' id= 'email' placeholder= 'jackson11@email.com'></input>
      <div style= {{'marginTop': '10px','fontSize': '77%'}}>For authentication reasons, you will not be emailed.</div>
      <button  style={{'marginTop': '15px'}} type='submit' >Submit Review</button>
    </form>
  </Modal>
  )
}

export default NewReviewModal;
