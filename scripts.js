// LYRIC INFO

const songLyricsArray =  {
  1:"die die die my darling, Don't utter a single word, die die die my darling, Just shut your pretty eyes, I will be seeing you again, I will be seeing you in hell, [Chorus], So don't cry to me oh baby, Your future is in an oblong box, Don't cry to me oh baby, You should have seen it coming on, Don't cry to me oh baby, Had to know it was in your card, Don't cry to me oh baby, Dead-end soul for a dead-end girl, Don't cry to me oh baby, And now your life drains on the floor, Don't cry to me oh baby, [Pre-Chorus], die die die my darling, Don't utter a single word, die die die my darling, Just shut your pretty mouth, I will be seeing you again, I will be seeing you in hell".split(', '),
  2: "Twenty-five years and my life is still, Trying to get up that great big hill of hope, For a destination, I realized quickly when I knew I should, That the world was made up of this brotherhood of man, For whatever that means, And so I cry sometimes when I'm lying in bed, Just to get it all out what's in my head, And I, I am feeling a little peculiar, And so I wake in the morning and I step outside, And I take a deep breath and I get real high, and I Scream from the top of my lungs, What's going on?, And I say hey yeah yeah hey yeah yeah, I said hey what's going on?, And I say hey yeah yeah hey yeah yeah,I said hey what's going on?".split(', ')
};


// INITIAL REDUX STATE

const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Die, My Darling",
      artist: "Metallica",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "What's Goin' On",
      artist: "Four Non-Blondes",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
}



// REDUX REDUCER

const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newState;
  switch (action.type) {
    case 'NEXT_LYRIC':
    let newArrayPosition = state.arrayPosition + 1;
    newState = {
      songLyricsArray: state.songLyricsArray,
      arrayPosition: newArrayPosition,
    }
    return newState;
    case 'RESTART_SONG':
    newState = initialState;
    return newState;
  default:
    return state;
  }
}

// JEST TESTS + SETUP

const { expect } = window;

expect(lyricChangeReducer(initialState, {type: null})).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, {type: 'NEXT_LYRIC'})).toEqual({
  1: {
    title: "Die, My Darling",
    artist: "Metallica",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  }
});

expect(lyricChangeReducer(initialState.songsById,
{ type: 'RESTART_SONG'})
).toEqual({
  1: {
    title: "Die, My Darling",
    artist: "Metallica",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});

// REDUX STORE

const { createStore } = Redux;
const store = createStore(reducer);
console.log(store.getState());

// RENDERING STATE IN DOM

const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  const renderedLine = document.createTextNode(currentLine);
  document.getElementById('lyrics').appendChild(renderedLine);
}

window.onload = function() {
  renderLyrics();
}

// CLICK LISTENER

const userClick = () => {
  const currentState = store.getState();
  if(currentState.arrayPosition === currentState.songLyricsArray.length -1) {
    store.dispatch({ type: 'RESTART_SONG'} );
  } else {
  store.dispatch({ type: 'NEXT_LYRIC'} );
}
  console.log(store.getState());
}

// SUBSCRIBE TO REDUX STORE

store.subscribe(renderLyrics);
