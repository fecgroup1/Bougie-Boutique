import React, {Fragment, useEffect} from 'react';
import { SearchBar, ThemeToggle } from '../../Styles'

const SearchQuestions = (props) => {

  useEffect(() => {
    document.getElementById('searchQuestionInput').value = '';
  }, [props.currentProductId])
    return (
      <Fragment>
        <form className='searchQuestion' style={{display: 'flex'}}>
          <i className="lni lni-search-alt" style={
            { marginTop: '7px',
              marginLeft: '10px',
              position: 'absolute',
              fontSize: '32px'
            }
          }></i>
          <SearchBar data-testid='searchQuestions' id='searchQuestionInput' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
          onChange={props.filterQuestions}/>
        </form>
      </Fragment>
    )
}

export default SearchQuestions