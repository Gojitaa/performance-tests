const App = ({ data } = {}) => {
	const template = () => 
		`<div class='app'>
			${JSON.stringify(data)}
		</div>`

	const render = parent => {
		parent.innerHTML = template();
	}

	return {
		render
	}
}

export default App;