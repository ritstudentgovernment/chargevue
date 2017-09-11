<template>
  <div class="carousel">
    <div id="carousel" :style="{ 'background-image': 'url(' + backgroundImage + ')' }">
				<div class="slogan">
					<h1>We've got your back</h1>
					<div>
						<p>Visualize and track the projects that we're working on to improve your path through RIT.</p>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      backgroundImage: this.getRandomImage()
    }
  },
  methods: {
    getRandomImage () {
      var images = ['http://i63.tinypic.com/qqbc6o.png', 'http://i64.tinypic.com/2yy34m9.png', 'http://i68.tinypic.com/wrxlc2.png']
      var random = Math.floor(Math.random() * images.length)
      return images[random]
    }
  }
}
</script>

<style scoped>
#carousel {
	text-align: center;
	color: white;
	height: 400px;
	background-attachment: fixed;
	background-repeat: no-repeat;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
}

#carousel h1 {
	cursor: default;
	padding: 0;
	margin: 0;
	text-transform: uppercase;
}

.slogan {
	display: inline-block;
	width: 100%;
	max-width: 400px;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
}
</style>
