const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dtpoyncyn',
  api_key: '683253746591584',
  api_secret: 'jbfe8TPl6QzjP-pTz7SYeoMumMg',
});

console.log('a-ok');

function showUploadWidget() {
  cloudinary.openUploadWidget(
    {
      cloudName: 'dtpoyncyn',
      uploadPreset: 'rvv34pcq',
      sources: [
        'local',
        'url',
        'camera',
        'image_search',
        'google_drive',
        'facebook',
        'dropbox',
        'instagram',
        'shutterstock',
        'getty',
        'istock',
        'unsplash',
      ],
      //    googleApiKey: "<image_search_google_api_key>",
      showAdvancedOptions: true,
      cropping: true,
      multiple: false,
      defaultSource: 'local',
      styles: {
        palette: {
          window: '#FFFFFF',
          windowBorder: '#90A0B3',
          tabIcon: '#0078FF',
          menuIcons: '#5A616A',
          textDark: '#000000',
          textLight: '#FFFFFF',
          link: '#0078FF',
          action: '#FF620C',
          inactiveTabIcon: '#0E2F5A',
          error: '#F44235',
          inProgress: '#0078FF',
          complete: '#20B832',
          sourceBg: '#E4EBF1',
        },
        fonts: {
          default: {
            active: true,
          },
        },
      },
    },
    (err, info) => {
      if (!err) {
        console.log('Upload Widget event - ', info);
      }
    }
  );
}

showUploadWidget();


var url;

    // api url. remove spaces from input and replace spaces with dashes, and make all letters lowercase
    var url = "" 
    // fetch api
    fetch(url).then(function(response) {
        // if serer response is ok
        if (response.ok) {
            // log response
            console.log(response);
            response.json().then(function (data) {
                // long data returned from server
                console.log(data);
                // update the image src with the photo link of the city
                img.src = data.photos[0].image.web;
                //clear search field after submission
                // resetInput(getCityEl.value);
            })
        }
    });


