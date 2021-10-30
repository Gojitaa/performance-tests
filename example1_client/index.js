import App from './src/App';
import PerfCure from 'perfcure';

const main = async () => {
	const root = document.querySelector('#root')
	const performanceMonitor = new PerfCure();
	performanceMonitor.init(entries => console.log(entries));

	App().render(root)
	
	const emojiJson = await fetch('http://localhost:3000/api')
	const emojies = await emojiJson.json()

	App({ emojies }).render(root)
}

main()