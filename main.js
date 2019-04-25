/* main.js - self explanatory? */

/* Global Script Variables */
var signedIn = false;
var token = '';
var user = '';
var db = '';
var featuredDoc = '';
var myUserId = 'H93Xm9f6Oflyuiczd3za';
var selectedPostDoc = '';
var currentUserDbDoc = '';

/* Bootup funtion */
function bootUp(){

	/* Materialize UI Elements Initialization */
	$('.sidenav').sidenav();
	$('.carousel').carousel({fullWidth: true});
	setInterval(function(){M.Carousel.getInstance(lpcsl).next();}, 3000);
	
	/* jQueryUi Elements Initialization */
	setTimeout(function(){$('#read_mode').fadeOut();}, 1000);
	
	/* Firebase Initialization */
	firebase.initializeApp({
		apiKey: "AIzaSyCxjDzkkg-svlOWWvpHc54dYDS5N2nJAXk",
		authDomain: "untamed-fun.firebaseapp.com",
		databaseURL: "https://untamed-fun.firebaseio.com",
		projectId: "untamed-fun",
		storageBucket: "untamed-fun.appspot.com",
		messagingSenderId: "39394570958"
	});
	db = firebase.firestore();
	db.collection('users').doc(myUserId).collection('posts').get().then(function(querySnapshot){
		querySnapshot.forEach((doc)=>{
			if(doc.data().featured == true) featuredDoc = doc;
		});
		document.getElementById('featured_post_title').innerHTML = featuredDoc.data().title;
		document.getElementById('featured_post_body').innerHTML = featuredDoc.data().body;
		/* TODO: The carousel images need to come from the array frameContents */
		db.collection('users').doc(myUserId).collection('posts').doc(featuredDoc.id).collection('comments').limit(10).get().then(function(querySnapshot){
			querySnapshot.forEach((doc)=>{
				clearComments();
				appendComment(doc.id, doc.data().userDocId, doc.data().comment, doc.data().timestamp.toDate());
			});
		});
	});
	
}

/* Helper Functions */

/* Load Post Function */
function loadPost(){
	document.getElementById('post_title').innerHTML = selectedPostDoc.data().title;
	document.getElementById('post_body').innerHTML = selectedPostDoc.data().body;
	/* TODO: The carousel images need to come from the array frameContents */
	db.collection('users').doc(myUserId).collection('posts').doc(selectedPostDoc.id).collection('comments').limit(10).get().then(function(querySnapshot){
		querySnapshot.forEach((doc)=>{
			clearComments();
			appendComment(doc.id, doc.data().userDocId, doc.data().comment, doc.data().timestamp.toDate());
		});
	});
}

/* Claer Comments Function */
function clearComments(){
	document.getElementById('post_comments').innerHTML = '';
}

/* Append Comment Function */
function appendComment(commentDocId, userDocId, comment, timestamp){
	db.collection('users').doc(userDocId).get().then(function(doc){
		document.getElementById('post_comments').innerHTML += '<div class="row valign-wrapper"><div class="col s1 m1 l1 xl1 left"><img id="'+commentDocId+'_profile_picture" class="circle" style="max-height:128px;" src="'+doc.data().photoURL+'" alt="Unable to load image" /></div><div class="col s11 m11 l11 xl11 left"><h4 id="'+commentDocId+'_user" style="font-weight:bold;">'+doc.data().displayName+'</h4><p id="'+commentDocId+'_timestamp" style="font-size:0.8em;">'+timestamp+'</p><p id="'+commentDocId+'" style="font-size:1.2em;">'+comment+'</p></div></div>';
	});
}

/* Callback functions */

/* On User Signed In Function */
function onSignIn(){
	document.getElementById('profile_picture').src = user.photoURL;
	document.getElementById('profile_name').innerHTML = user.displayName;
	document.getElementById('profile_email').innerHTML = user.email;
	document.getElementById('button_profile_edit').style.display = 'block';
	document.getElementById('button_sign_in_out').innerHTML = '<i class="material-icons">exit_to_app</i>Sign Out';
	db.collection('users').get().then(function(querySnapshot){
		var checkFlag = false;
		querySnapshot.forEach((doc)=>{
			if(doc.data().email = user.email){
				checkFlag = true;
				currentUserDbDoc = doc;
			}
		});
		if(!checkFlag){
			db.collection('users').add({
				email: user.email,
				displayName: user.displayName,
				photoURL: user.photoURL
			}).then(function(doc){
				currentUserDbDoc = doc;
			});
		}
	});
}

/* On User Signed Out Function */
function onSignOut(){
	signedIn = false;
	document.getElementById('profile_picture').src = 'images/icons/favicon-large.png';
	document.getElementById('profile_name').innerHTML = '-';
	document.getElementById('profile_email').innerHTML = '-';
	document.getElementById('button_profile_edit').style.display = 'none';
	document.getElementById('button_sign_in_out').innerHTML = '<i class="material-icons">exit_to_app</i>Sign In';
}

/* Listeners function */
function establishListeners(){

	/* Handle Continue Reading button click */
	document.getElementById('button_continue_reading').onclick = function(){
		selectedPostDoc = featuredDoc;
		loadPost();
		$('#display_mode').fadeOut();
		setTimeout(function(){
			$('#read_mode').fadeIn();
			$('html, body').animate({scrollTop: $("#main_content").offset().top}, 300);
		}, 200);
	}
	
	/* Handle Go Back button click */
	document.getElementById('button_go_back').onclick = function(){
		$('#read_mode').fadeOut();
		setTimeout(function(){
			$('#display_mode').fadeIn();
			$('html, body').animate({scrollTop: $(".navbar-fixed").offset().top}, 300);
		}, 200);
	}

	/* Handle Sign in / Sign out button click */
	document.getElementById('button_sign_in_out').onclick = function(){
		if(!signedIn){
			/* Begin Google Sign In Process */
			firebase.auth().useDeviceLanguage();
			firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result){
				signedIn = true;
				token = result.credential.accessToken;
				user = result.user;
				onSignIn();
			}).catch(function(error){console.log(error);});
		}
		else{
			/* Sign the user out */
			firebase.auth().signOut().then(function(){
				onSignOut();
			}).catch(function(error){console.log(error);});
		}
	}
	
	/* Handle My Profile button click */
	document.getElementById('button_profile_edit').onclick = function(){
		/* TODO: Add something here */
		window.alert('Coming soon!');
	}
	
}

/* Begin script execution after the web app has loaded completely */
window.onload = function(){

	/* Boot the web application up */
	bootUp();
	
	/* Establish UI Element Listeners */
	establishListeners();
	
}
