const submitFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.submit-pref')
  .addEventListener('submit', submitFormHandler);

// Cloudinary Event Listener to Upload Photo
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'dtpoyncyn',
    uploadPreset: 'rvv34pcq',
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info.url);
      Preferences.update(
        { profile_picture: result.info.url },
        { where: { user_id: req.session.user } }
      );
    }
  }
);

document.getElementById('upload_widget').addEventListener(
  'click',
  function () {
    myWidget.open();
  },
  false
);
