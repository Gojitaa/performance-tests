import App from './src/App';

const observer = new PerformanceObserver(function(list) {
    const perfEntries = list.getEntries();
    for (let i = 0; i < perfEntries.length; i++) {
        console.log(perfEntries[i])
    }
});

const main = async () => {
	listenToPerformance();
	const root = document.querySelector('#root')

	App().render(root)
	
	const emojiJson = await fetch('http://localhost:3000/api')
	const emojies = await emojiJson.json()

	App({ emojies }).render(root)
}
	


const listenToPerformance = () => {
	observer.observe({type: 'resource', buffered: true})
	observer.observe({type: 'longtask', buffered: true})
	observer.observe({type: "paint", buffered: true})
	observer.observe({type: "largest-contentful-paint", buffered: true})
}

main()