import React, {Fragment, useEffect} from 'react';

const SearchQuestions = (props) => {

  useEffect(() => {
    document.getElementById('searchQuestionInput').value = '';
  }, [props.currentProductId])
    return (
      <Fragment>
        <form className='searchQuestion'>
          <i className="lni lni-32 lni-search"></i>
          <input id='searchQuestionInput' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
          onChange={props.filterQuestions}/>
        </form>
      </Fragment>
    )
}

export default SearchQuestions