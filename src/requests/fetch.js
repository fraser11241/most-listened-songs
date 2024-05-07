export const genericErrorHandler = (response) => {
	if (!response.ok) {
		let errorMessage = null;
		
		if(response.status === 401) {
			errorMessage = "Token expired" 
		}
		else if (response.status === 429) {
			errorMessage = "API rate limit exceeded. Too many requests made to Spotify API"
		}
		throw Error(
			errorMessage ||
				response.statusText ||
				`Response was not ok. Status code: ${response.status}`
		);
	}
	return response;
};

// Return an object containg response json and status, or status if error
export const getEndpoint = async (token, path, method = "GET") => {
	return await fetch(`https://api.spotify.com/v1/${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then(genericErrorHandler)
		.then(async (response) => await response.json()) // TODO need to check the response here and handle appropriately
		.then((json) => {
			return json;
		});
};

// Return an object containg response json and status, or status if error
export const postDataToEndpoint = async (token, path, data) => {
	return await fetch(`https://api.spotify.com/v1/${path}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then(genericErrorHandler)
		.then(async (response) => await response.json())
		.then((json) => {
			return json;
		});
};
