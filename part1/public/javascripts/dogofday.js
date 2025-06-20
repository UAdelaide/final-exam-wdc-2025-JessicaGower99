console.log('Loaded: vue-setup.js');

document.addEventListener('DOMContentLoaded', function () {
    const { createApp } = Vue;

    const app = createApp({
        data() {
            return {
                dogImgURL: '',
                dogName: 'Stinky',
                dogBreed: 'Unknown',
                dogAge: '3 years'
            };
        },
    }
        // get random image of dog
        mounted() {
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(res => res.json())
                .then(data => {
                    this.dogImageUrl = data.message;
                })
                .catch(err => {
                    console.error('Failed to a cute dog image:', err);
                });
        }
    });
})

    app.mount('#app');