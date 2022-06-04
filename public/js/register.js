const submitFormHandler = async (event) => {
  event.preventDefault();

  const about_me = document.querySelector('#about_me').value.trim();
  const fave_genre = document.querySelector('#fave_genre').value.trim();
  const fave_experience_style = document
    .querySelector('#fave_experience_style')
    .value.trim();
  const fave_decade = document.querySelector('#fave_decade').value.trim();
  const intentions = document.querySelector('#intentions').value.trim();
  const profile_pic = result.info.url;
  const user_id = req.session.user_id;

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
        user_id,
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

document
  .querySelector('.save_pref')
  .addEventListener('submit', submitFormHandler);
