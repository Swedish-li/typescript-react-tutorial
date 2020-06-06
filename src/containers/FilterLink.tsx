// import { Props } from "../components/Link";
import { RootState } from '../reducers'
import { FilterType } from '../reducers/visibilityFilter'
import { setVisibilityFilter } from '../actions'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import Link from '../components/Link'

type Props = {
  filter: FilterType
}

const mapStateToProps = (state: RootState, ownProps: Props) => ({
  active: state.visibilityFilter === ownProps.filter,
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: Props) => ({
  setFilter: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Link)
