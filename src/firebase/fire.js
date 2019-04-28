import firebase from 'firebase';

const fire = firebase.initializeApp(require('./config.json'));

export default fire;
export const db = fire.database();
export const func = fire.functions();
