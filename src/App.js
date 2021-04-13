import React, { useState } from 'react';
import './App.css';
import { useLocalStore, useObserver } from 'mobx-react';

const StoreContext = React.createContext(); // create instance of context

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    // List data.
    bugs: ['Centipede'],
    // create add function.
    addBug: (bug) => {
      store.bugs.push(bug);
    },
    // Log everytime when state update.
    get bugsCount() {
      return store.bugs.length;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const BugHeaders = () => {
  // useContext is use to connect store and component.
  const store = React.useContext(StoreContext);
  // useObserver is use to reflect changes.
  return useObserver(() => <h1>{store.bugsCount} Bugs !</h1>);
};

const BugList = () => {
  // useContext is use to connect store and component.
  const store = React.useContext(StoreContext);
  // useObserver is use to reflect changes.
  return useObserver(() => (
    <ul>
      {store.bugs?.map((bug, i) => (
        <li key={i}>{bug}</li>
      ))}
    </ul>
  ));
};

const BugsForm = (name) => {
  // useContext is use to connect store and component.
  const store = React.useContext(StoreContext);
  const [bugs, setBugs] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        bugs.length && store.addBug(bugs);
        setBugs('');
      }}
    >
      <input
        type='text'
        value={bugs}
        onChange={(e) => setBugs(e.target.value)}
      />
      <button type='submit'>ADD</button>
    </form>
  );
};

const App = () => {
  return (
    // we have to wrapper our component with StoreProvider
    <StoreProvider>
      <BugHeaders />
      <BugsForm />
      <BugList />
    </StoreProvider>
  );
};

export default App;

// Reference https://www.youtube.com/watch?v=pnhIJA64ByY
