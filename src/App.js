import React, { useEffect, useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import LayoutLoadingComponent from './components/LayoutLoading';
import Create from './components/create';

function App() {
	const LayoutLoading = LayoutLoadingComponent(Layout);
	const [appState, setAppState] = useState({
		loading: false,
		layout: null,
	});
	// Checking for data from the backend on load. 
	useEffect(() => {
		setAppState({ loading: true });
		const apiUrl = `https://rahulsenguttuvan-xmeme-app.herokuapp.com/memes/`;
		fetch(apiUrl)
			.then((data) => data.json()) 
			.then((layout) => {
				// Setting state of loading to true if no data available in the backend, or if it's taking time
				setAppState({ loading: false, layout: layout });
			});
	}, [setAppState]);
	return (
		<div className="App">
      <Create />
      <h1>Latest Meme's</h1>
			<LayoutLoading isLoading={appState.loading} layout={appState.layout} />
		</div>
	);
}
export default App;