import React from 'react'
import invariant from 'invariant'
import { wrapDisplayName } from 'recompose'
import { capitalize } from 'lodash'

const submoduleChecker = {
  panorama: 'Panorama',
  geocoder: 'Service'
};

const withNavermaps = ({ submodules = []} = {}) => WrappedComponent => {
  class Navermaps extends React.Component {
    constructor (props) {
      super(props);
      
      const navermaps = this.getNavermapsModule();
      invariant(navermaps, 'props.navermaps or window.naver.maps is required.')

      if (submodules && submodules.length > 0) {
        submodules.forEach(submodule => {
          const checkerObj = submoduleChecker[submodule];
          invariant(navermaps[checkerObj], `${submodule} is required`)
        })
      }
    }
    
    getNavermapsModule () {
      return this.props.navermaps || (window.naver && window.naver.maps);
    }
    
    render () {
      const navermaps = this.getNavermapsModule();
      
      return <WrappedComponent {...this.props} navermaps={navermaps} />
    }
  }

  Navermaps.displayName = wrapDisplayName(WrappedComponent, 'withNavermaps');
  
  return Navermaps;
}
  
export default withNavermaps;