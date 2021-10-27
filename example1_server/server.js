const http = require('http');
const db = require('./db/emoji.json');

const PORT = process.env.PORT || 3000;

const api = http.createServer((request, response) => {
	const basicHeaders = {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Origin': '*'
	}

	if (request.url === "/api" && request.method === "GET") {
		response.writeHead(200, basicHeaders);
		response.write(JSON.stringify(db));
		response.end();
	}
})

api.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

