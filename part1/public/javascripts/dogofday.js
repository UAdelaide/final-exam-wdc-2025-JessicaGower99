console.log('Loaded: vue-setup.js');

document.addEventListener('DOMContentLoaded', function () {
    const { createApp } = Vue;

    const app = createApp({
        data() {
            return {
                dogImageUrl: '',
                dogName: 'Stinky',
                dogBreed: 'Unknown',
                dogAge: '3 years'
            };
        },
        mounted() {
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(res => res.json())
                .then(data => {
                    this.dogImageUrl = data.message;
                })
                .catch(err => {
                    console.error('Failed to get a cute dog image:', err);
                });
        }
    });

    app.mount('#app');
});
