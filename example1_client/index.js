import App from './src/App';

const main = async () => {
	const root = document.querySelector('#root')

	App({ data: 'Loading...' }).render(root)
	
	const emojiResponse = await fetch('http://localhost:3000/api')
	const emojies = await emojiResponse.json()

	App({ data: emojies }).render(root)
}
	
main()