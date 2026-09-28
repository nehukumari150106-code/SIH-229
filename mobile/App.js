import React, {useState} from 'react';

import CustomerNavigator from './src/navigation/CustomerNavigator';
import CollectorNavigator from './src/navigation/CollectorNavigator';
import AggregatorNavigator from './src/navigation/AggregatorNavigator';
import RecyclerNavigator from './src/navigation/RecyclerNavigator';

function App() {
  const [userRole, setUserRole] = useState(null);

  if (userRole === 'collector') {
    return <CollectorNavigator />;
  }

  if (userRole === 'aggregator') {
    return <AggregatorNavigator />;
  }

  if (userRole === 'recycler') {
    return <RecyclerNavigator />;
  }

  return (
  <CustomerNavigator
    onAuthenticated={setUserRole}
    startAtDashboard={userRole === 'customer'}
  />
);
}

export default App;