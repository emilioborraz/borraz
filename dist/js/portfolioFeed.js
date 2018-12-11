Vue.prototype.$http = axios;


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
var vm = new Vue({
    el: "#portfolioFeed",
    data: {
	    version: 1.0,
      wallElementsLoaded: false,
      dataFeedUrl: 'http://borrazb.test',
      wallElements: []
    },
    methods:{
        getPrettyDate: function(dateString){
            let dateObject = new Date(Date.parse(dateString));
            return dateObject.getDate()+'/'+dateObject.getMonth()+'/'+dateObject.getFullYear();
        }
    },
    mounted:
      function(){
        this.$http
        .get(this.dataFeedUrl)
        .then(response => {
          this.wallElementsLoaded = true;
          this.wallElements = response.data;
        })
        .catch(error => {
          console.log(error)
          this.wallElementsLoaded = false
        })
        .finally(() => this.wallElementsLoaded = false)
      }
});