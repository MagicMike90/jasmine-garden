import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplashScreen from './SplashScreen';

class SplashScreenContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <SplashScreen {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps() {
  return {};
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreenContainer);
