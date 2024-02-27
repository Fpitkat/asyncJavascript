const promise = new Promise((resolve, reject) => {
  if (true) {
    resolve('It worked');
  } else {
    reject('Error, it broke');
  }
});

promise
  .then((result) => {
    new Error();
    return console.log(result + '!');
  })
  .then((result2) => {
    console.log(result2);
  })
  .catch((error) => console.log(error));

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'HIII');
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'POOKIE');
});

const promise4 = new Promise((resolve, reject) => {
  setTimeout(
    resolve,
    3000,
    'Is it me you are looking for?'
  );
});

Promise.all([promise, promise2, promise3, promise4]).then(
  (values) => {
    console.log(values);
  }
);

const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums',
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((res) => res.json());
  })
)
  .then((results) => {
    console.log(results[0]);
    console.log(results[1]);
    console.log(results[2]);
  })
  .catch((e) => console.log(e));

//   Async Await

async function fetchUsers() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = await res.json();
  console.log(data);
}

fetchUsers();

const getData = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    );
    console.log('users', users);
    console.log('posts', posts);
    console.log('albums', albums);
  } catch (err) {
    console.log('ooops', err);
  }
};

// for await of
const getData2 = async function () {
  const arrayOfPromises = urls.map((url) =>
    fetch(url).then((res) => res.json())
  );
  for await (let request of arrayOfPromises) {
    console.log(request);
  }
};

getData2();
