let button = document.getElementById("button");
let post = document.querySelector(".post");
let postList = document.querySelector(".postList");
let input = document.getElementById("input");

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDDk_rDIfgGG_pV1m-A_T2L83_vrTTQvj8",
	authDomain: "calhacks6-27fd6.firebaseapp.com",
	databaseURL: "https://calhacks6-27fd6.firebaseio.com",
	projectId: "calhacks6-27fd6",
	storageBucket: "calhacks6-27fd6.appspot.com",
	messagingSenderId: "654430740593",
	appId: "1:654430740593:web:c2dfd0c948c3c9f4edfbd0",
	measurementId: "G-SPG4QB0TGY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Get a reference to the database service
var database = firebase.database();

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
}

function writeUserPost(postId, content, date) {
  firebase.database().ref('posts/' + postId).set({
    content: content,
		date: date,
  });
}

function deleteUserPost(postId) {
  firebase.database().ref('posts/' + postId).set(null);
}

// generates random post ID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function addPost(){
	console.log("someone made a post!");

	// writeUserData('1', 'elmo', 'elmo@ss.com');
	writeUserPost(uuidv4(), input.value, Date.now());
	input.value = '';
}

function writePostList(posts) {
	postList.textContent = '';

	// turn the dict of posts into an array of post
	// b/c you can sort an array (but not a dict)
	var postArray = [];
	for (var postId in posts) {
		postArray.push({
			id: postId,
			content: posts[postId].content,
			date: posts[postId].date,
		});
	}
	// tell javascript how to sort this array
	postArray.sort((p1, p2) => {
		 let d1 = p1.date || 0;
		 let d2 = p2.date || 0;
		 return d2 - d1;
	});
	// take sorted posts list, append it to the HTML
	for (var post of postArray) {
		let postElement = document.createElement('div');
		postElement.className = 'post';
		postElement.textContent = post.content + ' ' + new Date(post.date);
		postList.appendChild(postElement);
	}

	// for(postId in posts) {
	// 	let actualPost = document.createElement('div');
	// 	actualPost.className = "post";
	//
	// 	if (posts[postId].content != ""){ //only if post isn't blank
	//
	// 		//new Date() only grabs the time at the moment it is run,
	// 		//force new Date() to run every time a post is made to grab the current time
	// 		// var time = new Date();
	// 		var time = new Date(posts[postId].date);
	//
	// 		actualPost.textContent = posts[postId].content + "  " + time;
	// 		postList.appendChild(actualPost);
	// 	}
	// }
}

let starCountRef = firebase.database().ref('posts/');
starCountRef.on('value', function(snapshot) {
  writePostList(snapshot.val());
	console.log(snapshot.val());

});

button.addEventListener('click', addPost);

deleteUserPost("0b564e58-385d-47bb-b7e8-133754804896");
