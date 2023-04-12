// Define the list of images
var images = [	"img/dog.jpg",	"img/Fox.jpg",	"img/Image.jpg",	"img/Lion.jpg",	"img/Zebra.jpg"];

// Set the initial image index to 0
var imageIndex = 0;

// Get references to the HTML elements
var imageElement = document.getElementById("image");
var thumbnailContainer = document.getElementById("thumbnail-container");
var prevButton = document.getElementById("prevBtn");
var nextButton = document.getElementById("nextBtn");
var updateButton = document.getElementById("updateBtn");

// Display the initial image and thumbnails
displayImage();
displayThumbnails();

// Add event listeners to the buttons and thumbnails
prevButton.addEventListener("click", showPreviousImage);
nextButton.addEventListener("click", showNextImage);
updateButton.addEventListener("click", updateImage);
thumbnailContainer.addEventListener("click", handleThumbnailClick);

// Function to display the current image
function displayImage() {	
	imageElement.src = images[imageIndex];
}

// Function to show the previous image
function showPreviousImage() {
	imageIndex--;
	if (imageIndex < 0) {
		imageIndex = images.length - 1;
	}
	displayImage();
	updateThumbnails();
}

// Function to show the next image
function showNextImage() {
	imageIndex++;
	if (imageIndex >= images.length) {
		imageIndex = 0;
	}
	displayImage();
	updateThumbnails();
}

// Function to update the image to the first image
function updateImage() {
	imageIndex = 0;
	displayImage();
	updateThumbnails();
}

// Function to display the thumbnails
function displayThumbnails() {
	for (var i = 0; i < images.length; i++) {
		var thumbnail = document.createElement("img");
		thumbnail.classList.add("thumbnail");
		thumbnail.dataset.index = i;
		thumbnail.src = images[i];
		thumbnailContainer.appendChild(thumbnail);
	}
	updateThumbnails();
}

// Function to update the thumbnails
function updateThumbnails() {
	var thumbnails = thumbnailContainer.getElementsByTagName("img");
	for (var i = 0; i < thumbnails.length; i++) {
		var thumbnail = thumbnails[i];
		if (i == imageIndex) {
			thumbnail.style.opacity = 0.5;
			thumbnail.style.border = "1px solid red";
		} else {
			thumbnail.style.opacity = 1;
			thumbnail.style.border = "1px solid black";
		}
	}
}

// Function to handle thumbnail click events
function handleThumbnailClick(event) {
	if (event.target.classList.contains("thumbnail")) {
		imageIndex = parseInt(event.target.dataset.index);
		displayImage();
		updateThumbnails();
	}
}
