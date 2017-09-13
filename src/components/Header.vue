<template>
  <header>
    <div class="left">
      <div class="button" id="site">
        <span id="label">Go to Site</span>
      </div>
    </div>
    <p class="title"><router-link to="/">TigerTracker</router-link></p>
    <div class="right">
      <span class="button" id="label">Login</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400');

body {
	padding-top: 58px;
}

a {
  text-decoration: none;
  color: inherit;
}

header {
	padding-top: 15px;
	padding-bottom: 15px;
	display: inline-block;
	width: 100% !important;
	text-align: center;
	z-index: 2;
	background-color: white;
}

header .title {
	margin: 0;
	padding: 0;
	color: #EF6C20;
	font-size: 20px;
	font-weight: 300;
	display: inline;
	cursor: default;
}

header .button {
	cursor: pointer;
	font-weight: 300;
	color: grey;
	text-align: right;
	display: inline-block;
}

header .left {
	float: left;
	padding: 0px;
	margin: 0px;
	width: 25%;
	min-height: 1px;
}

header .right {
	float: right;
	height: 28px;
	width: 25% !important;
	padding: 0;
	margin: 0;
	min-height: 1px;
}

header i {
	display: inline-flex;
  vertical-align: middle;
}

@media screen and (max-width: 800px) {
	.button span {
		display: none;
	}
}
</style>
