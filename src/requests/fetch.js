const genericErrorHandler = (response) => {
	if (!response.ok) {
		throw Error(response.statusText || "Response was not ok");
	}
	return response;
};

export const callFunctionAndHandleErrors = (fn, errorHandler) =>
	fn().catch((e) => {
		console.log(e);
		errorHandler && errorHandler(e);
	});

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
