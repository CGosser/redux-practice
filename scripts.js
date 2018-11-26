const userClick = () => {
  console.log('click');
}


const songLyricsArray = "die die die my darling, Don't utter a single word, die die die my darling, Just shut your pretty eyes, I will be seeing you again, I will be seeing you in hell, [Chorus], So don't cry to me oh baby, Your future is in an oblong box, Don't cry to me oh baby, You should have seen it coming on, Don't cry to me oh baby, Had to know it was in your card, Don't cry to me oh baby, Dead-end soul for a dead-end girl, Don't cry to me oh baby, And now your life drains on the floor, Don't cry to me oh baby, [Pre-Chorus], die die die my darling, Don't utter a single word, die die die my darling, Just shut your pretty mouth, I will be seeing you again, I will be seeing you in hell".split(', ');

const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

const { createStore } = Redux;
const store = createStore(reducer);
console.log(store.getState());


// JEST TESTS + SETUP

const { expect } = window;

expect(reducer(initialState, {type: null})).toEqual(initialState);

expect(reducer(initialState, {type: 'NEXT_LYRIC'})).toEqual({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_LYRIC':
    let newArrayPosition = state.arrayPosition + 1;
    let newState = {
      songLyricsArray: state.songLyricsArray,
      arrayPosition: newArrayPosition,
    }
    return newState;
  default:
    return state;
  }
}
