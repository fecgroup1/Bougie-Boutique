import React, {Fragment, useEffect} from 'react';
import { SearchBar, ThemeToggle } from '../../Styles'

const SearchQuestions = (props) => {

  useEffect(() => {
    document.getElementById('searchQuestionInput').value = '';
  }, [props.currentProductId])
    return (
      <Fragment>
        <form className='searchQuestion'>
          <i className="lni lni-32 lni-search" style={
            { marginTop: '7px',
              marginLeft: '10px',
              position: 'absolute'}
          }></i>
          <SearchBar id='searchQuestionInput' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
          onChange={props.filterQuestions}/>
        </form>
      </Fragment>
    )
}

export default SearchQuestions