// Data (@todo to fetch the data from the server and use pre render data sent in the HTML template?)
var wallElementsJsonData = '[{  "text": "My top artist on #Spotify2018 ...... #daftpunk https://t.co/OHv5G4mJqt",    "description": "",  "thumbnail": "https://pbs.twimg.com/media/Dtv4w7SXQAUXat8.jpg:thumb",    "created_at": "Thu Dec 06 16:54:28 +0000 2018", "resourceLink": "https://twitter.com/emilioborraz/status/1070723156455899136",  "id": "1070723156455899136",    "source": "twitter"},{  "text": "Me canso ganso :)",    "description": "",  "thumbnail": "",    "created_at": "Sat Dec 01 18:03:09 +0000 2018", "resourceLink": "https://twitter.com/emilioborraz/status/1068928503591182339",  "id": "1068928503591182339",    "source": "twitter"}, { "text": "Toma de posesión de @lopezobrador_  (via @brozoxmiswebs en @airelibre_fm ) #mexico",   "description": "",  "thumbnail": "",    "created_at": "Sat Dec 01 16:50:11 +0000 2018", "resourceLink": "https://twitter.com/emilioborraz/status/1068910140655583233",  "id": "1068910140655583233",    "source": "twitter"}, { "text": "#time We have to see more of each other https://t.co/ubBWvQpb4d",  "description": "",  "thumbnail": "",    "created_at": "Wed Nov 21 15:43:52 +0000 2018", "resourceLink": "https://twitter.com/emilioborraz/status/1065269571412770816",  "id": "1065269571412770816",    "source": "twitter"}, { "text": "Distracted #driving https://t.co/g6bnEz7JMH",  "description": "",  "thumbnail": "",    "created_at": "Wed Nov 28 04:52:45 +0000 2018", "resourceLink": "https://twitter.com/emilioborraz/status/1067642430370004992",  "id": "1067642430370004992",    "source": "twitter"}, { "text": "#JS ecosystem 2018 https://t.co/cFuqFCD9GD",   "description": "",  "thumbnail": "",    "created_at": "Sun Nov 25 17:23:42 +0000 2018", "resourceLink": "https://twitter.com/emilioborraz/status/1066744245904654336",  "id": "1066744245904654336",    "source": "twitter"}]';
var wallElements = JSON.parse(wallElementsJsonData);

//Wall element component
Vue.component('wall-element', {
  props: ['wallElement', 'getPrettyDate'],
  data: function(){
    return {
      twitterDefaultImage: '/assets/Twitter_Social_Icon_Square_Color.svg'
    }
  },
  computed: {
    getImageSource: function(){
      return this.wallElement.thumbnail.length ? this.wallElement.thumbnail : this.twitterDefaultImage;
    },
    getBackgroundImageStyle: function(){
      return 'background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(248, 249, 250, 1)), url('+ this.getImageSource + ')';
    }
  },
  template: '<div class="col-md-4">' +
              '<div class="card mb-4 shadow-sm">' +
                '<div class="card-body card-body-bg-img" ' +
                  'v-bind:style="getBackgroundImageStyle" >' +
                  '<p class="card-text text-truncate">{{wallElement.text}}</p>' +
                  '<div class="d-flex justify-content-between align-items-center">' +
                    '<div class="text-muted">{{getPrettyDate(wallElement.created_at)}}</div>' +
                    '<div class="btn-group">' +
                      '<a type="button" v-bind:href="wallElement.resourceLink" class="btn btn-sm btn-outline-secondary">Ver</a>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>'
});

// Vue app
// '<div class="source-icon" v-bind:class="[\'source-\'+wallElement.source]"></div>' +
var vm = new Vue({
    el: "#portfolioFeed",
    data: {
	    version: 1.0,
      wallElements: wallElements
    },
    methods:{
        getPrettyDate: function(dateString){
            let dateObject = new Date(Date.parse(dateString));
            return dateObject.getDate()+'/'+dateObject.getMonth()+'/'+dateObject.getFullYear();
        }
    }
});