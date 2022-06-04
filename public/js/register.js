var profile_picture;

const submitFormHandler = async (event) => {
  event.preventDefault();
  console.log(profile_picture);
  const about_me = document.querySelector('#about_me').value.trim();
  const fave_genre = document.querySelector('#fave_genre').value.trim();
  const fave_experience_style = document
    .querySelector('#fave_experience_style')
    .value.trim();
  const fave_decade = document.querySelector('#fave_decade').value.trim();
  const intentions = document.querySelector('#intentions').value.trim();

  if (
    about_me &&
    fave_genre &&
    fave_experience_style &&
    fave_decade &&
    intentions &&
    profile_picture
  ) {
    const response = await fetch('/api/preferences', {
      method: 'POST',
      body: JSON.stringify({
        about_me,
        fave_genre,
        fave_experience_style,
        fave_decade,
        intentions,
        profile_picture,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'dtpoyncyn',
    uploadPreset: 'rvv34pcq',
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      profile_picture = result.info.url;
      console.log('Done! Here is the image info: ', profile_picture);
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

document
  .querySelector('.save_pref')
  .addEventListener('click', submitFormHandler);
