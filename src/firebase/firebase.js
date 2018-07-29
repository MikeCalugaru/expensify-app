import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

//// child_removed
//database.ref('expenses').on('child_removed', (snapshot) => {
//  console.log(snapshot.key, snapshot.val());
//});
//
//// child_changed
//database.ref('expenses').on('child_changed', (snapshot) => {
//  console.log(snapshot.key, snapshot.val());
//});
//
//// child_added
//database.ref('expenses').on('child_added', (snapshot) => {
//  console.log(snapshot.key, snapshot.val());
//});

//database.ref('expenses')
//  .once('value')
//  .then((snapshot) => {
//    const expenses = [];
//    snapshot.forEach((childSnapshot) => {
//      expenses.push({
//        id: childSnapshot.key,
//        ...childSnapshot.val()
//      });
//    });
//    
//    console.log(expenses);
//  });

//database.ref('expenses').push({
//  description: 'Rent',
//  amount: 234500,
//  note: '',
//  createdAt: 234645342
//});

//database.ref('note').push({
//  title: 'Course Topic',
//  body: 'React, Native, Angular'
//});
//
//database.ref('note').push({
//  title: 'To do',
//  body: 'Go for a run'
//});

//database.ref('note/-LI0L4TS2Q_IlIjpqClH').remove();

//const onValueChange = (snapshot) => {
//  const val = snapshot.val();
//  const print = `${val.name} is a ${val.job.title} at ${val.job.company}`;
//  console.log(print);
//};
//
//database.ref().on('value', onValueChange, (e) => {
//  console.log('Error with data fetching', e);
//});


//database.ref().on('value', (snapshot) => {
//  console.log(snapshot.val());
//}, (e) => {
//  console.log('Error with data fetching', e);
//});
//
//setTimeout(() => {
//  database.ref('age').set(29);
//}, 3500);
//
//setTimeout(() => {
//  database.ref().off('value');
//}, 7000);
//
//setTimeout(() => {
//  database.ref('age').set(50);
//}, 10500);

//database.ref('location/city')
//  .once('value')
//  .then((snapshot) => {
//    const val = snapshot.val();
//    console.log(val);
//  }).catch((e) => {
//    console.log('Error fetching data', e);
//  });

//database.ref().set({
//  name: 'Mike Calugaru',
//  age: 27,
//  stressLevel: 6,
//  job: {
//    title: 'Software developer',
//    company: 'Google'
//  },
//  location: {
//    city: 'Philadelphia',
//    country: 'United States'
//  }
//}).then(() => {
//  console.log('Data is saved');
//}).catch((e) => {
//  console.log('This failed', e);
//});
//
//database.ref().update({
//  stressLevel: 9,
//  'job/company': 'Amazon',
//  'location/city': 'Seattle'
//});

//database.ref('isSingle')
//  .remove()
//  .then(() => {
//    console.log('Remove successful');
//  }).catch((e) => {
//    console.log('Something went wrong!');
//  });