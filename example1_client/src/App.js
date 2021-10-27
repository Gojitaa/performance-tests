const App = ({ emojies } = {}) => {
	const template = () => 
		`<div class='app'>
			${emojies ? JSON.stringify(emojies) : 'Loading...'}
		</div>`

	const render = parent => {
		parent.innerHTML = template();
	}

	return {
		render
	}
}

export default App;