<template>
    <div id="main">
        <div class="container-intro">
            <svg xmlns="http://www.w3.org/2000/svg" id="logo" height="350px" viewBox="0 0 235.255 235.562">
            <path fill="#222" id="main-logo" d="M162.68 112.861c-2.768-1.23-6.15-1.845-10.456-2.46l-10.763-1.538c-2.153-.308-3.998-.923-5.844-1.538-1.845-.923-3.383-1.538-4.613-2.768-2.459-2.152-3.382-4.92-3.382-8.61 0-1.538.308-3.075.923-4.613V72.575c-4.613 2.153-8.304 5.536-10.764 9.533-2.46 3.998-3.69 8.918-3.69 14.454 0 7.688 2.153 13.531 6.766 17.836 4.306 3.998 10.147 6.458 17.837 7.381l11.07 1.537c2.768.308 4.92.923 6.458 1.538 1.538.614 2.768 1.538 3.997 2.46 2.461 2.152 3.691 5.535 3.691 9.533 0 4.613-1.846 7.996-5.229 10.455-1.23.924-2.768 1.538-4.305 2.153H72.575V81.801l-14.454 7.38v73.19s94.102.923 97.792 0h1.23v-.308c3.997-1.23 7.38-3.075 10.455-5.229 3.076-2.459 5.535-5.227 7.073-8.918 1.538-3.383 2.46-7.38 2.46-11.378 0-8.304-2.46-14.761-7.688-19.066-1.843-1.844-3.996-3.381-6.763-4.611z"></path>
            </svg>
        </div>
        <div class="animation">
            <kinesis-container class="container-animation">
                <kinesis-element strength="80" axis="y" >
                    <div class="circle circle-1"></div>
                </kinesis-element>
                <kinesis-element strength="80" axis="y">
                    <div class="circle circle-2"></div>
                </kinesis-element>
            </kinesis-container>
        </div>
        <div class="container-main" >
            <div class="joke" data-aos="flip-up"
                data-aos-duration="2000">
                <div class="question-time" v-if="contain()">
                    <h1> Question time: </h1>
                    <h3>{{data.setup}}</h3>
                    <h1 class="rotate" @click="show = !show" v-if="!show"> <strong>&#191;</strong></h1>
                    <h4 v-if="show">{{data.delivery}}</h4>
                </div>
                <div class="joke-time" v-if="!contain()">
                    <h1> Joke time: </h1>
                    <p>{{data.joke}}</p>
                </div>
                <button class="refresh-button" onClick="window.location.reload()">Next</button>
            </div>
        </div>
    </div>
</template>

<script>



export default {
    name: "main",
    data () {
        return {
            data: '',
            show: false,
        }
    },
    methods:{
        contain () {
            return this.data.joke == null;
        }
    },
    mounted () {
        const apiUrl = "https://sv443.net/jokeapi/v2/joke/Programming";
        this.axios
        .get(apiUrl)
        .then(response => {
            this.data = response.data;
            // Console log per controllare il corretto funzionamento dell'api
            console.log(response.data);
        })
        .catch(function (error) {
           console.log(error);
        });
    }
};

</script>

<style lang="scss">

// Mixin center
@mixin centerPosition ($display:flex, $align:center, $justy:center) {
    display:$display ;
    align-items: $align;
    justify-content: $justy
}

// Shadow
@mixin shadow($mix_box_shadow, $mix_box_padding, $box_radius) {
    box-shadow: $mix_box_shadow;
    padding: $mix_box_padding;
    border-radius: $box_radius;
};

$box_shadow: 0 5px 35px rgba(0,0,0,0.14);
$box_padding: 0 10px;
$box_radius: 12px;

// ? right to
@mixin keyframes ($swipe) {
    @-webkit-keyframes #{$swipe} {
        @content;
  }
    @keyframes #{$swipe} {
        @content;
    }
};

@mixin animation ($name, $time, $loop){
    animation-name: $name;
    animation-duration: $time;
    animation-iteration-count: $loop;
};

#main {
    height: calc(100vh - 100px);
    @include centerPosition();
    .animation {
        width: 100%;
        height: 100%;
        text-align: center;
        position: relative;
        .container-animation {
            height: 100px;
            padding: 15rem 0;
            background-color: #FFFFFF;
            img {
                width: 80px;
            }
            .circle {
                position: absolute;
                border-radius: 100%;
                }
            .circle.circle-1 {
                border: 15px solid #222222;
                opacity: 0.1;
                width: 200px;
                height: 200px;
                right: -5%;
                bottom: 10%;
                }
            .circle.circle-2 {
                border: 6px solid #222222;
                opacity: 0.3;
                width: 3vw;
                height: 3vw;
                top: 90%;
                left: 5%;
            }
        }
    }
    .container-main {
        height: 100%;
        width: 90%;
        position: absolute;
        @include centerPosition();
        .joke {
            height: 500px;
            width: 80%;
            @include centerPosition();
            @include shadow($box_shadow, $box_padding, $box_radius);
            flex-direction: column;
            position: absolute;
            z-index: 1;
            .question-time {
                padding: 20px;
                color: #222222;
                h1 {
                    color: #222222;
                }
                .rotate {
                    height: 80px;
                    strong {
                        font-size: 55px;
                        position: relative;
                        color: #222222;
                        z-index: 0;
                        @include animation (swipe, 5s, infinite);
                        @include keyframes (swipe) {
                            0% {left: 0px; }
                            50% {left: 20%; }
                            100% {left: -20%; }
                        }
                    }
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
            .joke-time {
                padding: 20px;
                h1 {
                    color: #222222;
                }
                p {
                    font-size: 20px;
                }
            }
            button {
                height: 45px;
                width: 100px;
                font-size: 25px;
                background-color: #FFFFFF;
                border-color: #222222;
                border-style: solid;
                &:hover {
                    cursor: pointer;
                    background-color: #222222;
                    border-color: #FFFFFF;
                    color: #FFFFFF;
                }
            }
        }
    }
}

</style>
