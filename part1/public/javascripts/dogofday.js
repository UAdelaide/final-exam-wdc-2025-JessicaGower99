const app = Vue.createApp({
    data() {
        return {
            dogImgURL: '',
            dogName: 'Stinky',
            dogBreed: 'Unknown',
            dogAge: '3 years'
        };
    },
//get random image
mounted(){
    fetch('https://dog.ceo/api/breeds/image/random)
}

);