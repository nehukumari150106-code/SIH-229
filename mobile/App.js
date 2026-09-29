import React, {useState} from 'react';

import CustomerNavigator from './src/navigation/CustomerNavigator';
import CollectorNavigator from './src/navigation/CollectorNavigator';
import AggregatorNavigator from './src/navigation/AggregatorNavigator';
import RecyclerNavigator from './src/navigation/RecyclerNavigator';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  if (currentUser?.role === 'collector') {
    return <CollectorNavigator />;
  }

  if (currentUser?.role === 'aggregator') {
    return <AggregatorNavigator />;
  }

  if (currentUser?.role === 'recycler') {
    return <RecyclerNavigator />;
  }

  return (
    <CustomerNavigator
      onAuthenticated={setCurrentUser}
      startAtDashboard={currentUser?.role === 'customer'}
      currentUser={currentUser}
    />
  );
}

export default App;