import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyCDn0pEn7IkkRaAjizu2dJBqeqOEuusHIE',
  authDomain: 'stackathon-ers.firebaseapp.com',
  databaseURL: 'https://stackathon-ers.firebaseio.com',
  projectId: 'stackathon-ers',
  storageBucket: 'stackathon-ers.appspot.com',
  messagingSenderId: '518561221035'
};
const fire = firebase.initializeApp(config);
export default fire;
