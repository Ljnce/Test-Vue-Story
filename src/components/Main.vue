<template>
    <div id="main">
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
