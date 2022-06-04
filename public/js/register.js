var profile_pic;

const submitFormHandler = async (event) => {
  event.preventDefault();
  console.log(profile_pic);
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
    profile_pic
  ) {
    const response = await fetch('/api/preferences', {
      method: 'POST',
      body: JSON.stringify({
        about_me,
        fave_genre,
        fave_experience_style,
        fave_decade,
        intentions,
        profile_pic,
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
      console.log('Done! Here is the image info: ', result.info.url);
      profile_pic = result.info.url;
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
