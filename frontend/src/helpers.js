// Helper File
export const fileToDataUrl = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export const apiCallPost = (path, body, token = false) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5005/' + path, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
};

export const apiCallPut = (path, body, token = false) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5005/' + path, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
};

export const apiCallGet = (path, token, queryString) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5005/' + path + '?' + queryString, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
};

export const apiCallDelete = (path, token = false) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5005/' + path, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      });
  });
};
