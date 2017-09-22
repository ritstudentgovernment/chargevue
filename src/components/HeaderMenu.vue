<!--

filename: HeaderMenu.vue
description: Header component for use across all pages

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <header>
      <div class="left">
        <div class="link" id="site">
          <span id="label">Go to Site</span>
        </div>
      </div>
      <p class="title"><router-link to="/">TigerTracker</router-link></p>
      <div class="right">
        <span class="link" id="label" @click="active = true">Login</span>
      </div>
    </header>

    <div>
      <div class="modal" v-bind:class="{ 'is-active': active }">
      <div class="modal-background" @click="active = false"></div>
      <div class="modal-card">
        <div class="modal-card-head">
          <p class="modal-card-title">Login</p>
        </div>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" placeholder="RIT Username">
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="RIT Password">
            </div>
          </div>
        </section>
        <div class="modal-card-foot">
          <button class="button is-success">Login</button>
          <button class="button" @click="active = false">Cancel</button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'headermenu',
  data () {
    return {
      active: false
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

header .link {
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

p {
  padding: 0;
}

.modal-card-head {
  padding: 0 0 0 20px;
  text-align: left;
}

.control {
  padding-right: 20px;
}
</style>
