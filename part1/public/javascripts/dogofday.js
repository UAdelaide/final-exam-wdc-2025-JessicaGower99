document.addEventListener('DOMContentLoaded', () => {
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
        methods: {
            fetchDogImage() {
                fetch('https://dog.ceo/api/breeds/image/random')
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (data) {
                        this.dogImageUrl = data.message;
                    }.bind(this))
                    .catch(function (err) {
                        console.error('Failed to get a cute dog image:', err);
                    });
            }
        },
        mounted() {
            this.fetchDogImage();
        }
    });

    app.mount('#app');
});
