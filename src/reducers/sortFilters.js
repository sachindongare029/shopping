const sortFilters = (state = [], action) => {
  // console.log("Action", action);
  if(action.type === 'SORT_OPTION') {
    return [ ...state, {
      selectedSortOption : action.value
    } ] ;
  } else {
    return state;
  }
}

export default sortFilters;

