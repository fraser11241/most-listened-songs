import React from "react";

import "./ImageGrid.css";

const ImageGrid = (props) => {
	const { images, imageCaptions } = props;

	return images ? (
		<ul
			style={{
				display: "flex",
				flexWrap: "wrap",
				listStyle: "none",
			}}
			className="image-list"
		>
			{images.map(({ url }, index) => (
				<li key={index}>
					<img
						src={url}
						style={{
							maxHeight: "100%",
							minWidth: "100%",
						}}
						alt={
							imageCaptions && imageCaptions.length > index
								? imageCaptions[index]
								: "Album cover"
						}
					/>
				</li>
			))}
		</ul>
	) : (
		<span>No images found</span>
	);
};

export default ImageGrid;
