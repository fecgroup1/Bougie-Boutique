import React from 'react'
import WidgetContainer from '../../Styles'

class Overview extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>hello productID {this.props.store.state.currentProductId}
      <button onClick={this.props.store.changeProduct}>changeProduct</button>
      </div>
    );
  }
}

export default Overview;