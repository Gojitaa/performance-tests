import App from './src/App';

const main = async () => {
	const root = document.querySelector('#root')

	App().render(root)
	
	const emojiJson = await fetch('http://localhost:3000/api')
	const emojies = await emojiJson.json()

	App({ emojies }).render(root)
}
	
main()