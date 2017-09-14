<!--

filename: CommitteesMenu.vue
description: Component showing the menu of committees with links to the Committee.vue page

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div id="committee_bar" class="committees-menu">
    <ul>
			<li><router-link to="/committee/academicsandcoop">Academic &amp; Coops</router-link></li>
			<li><router-link to="/committee/fpat">FPAT</router-link></li>
			<li><router-link to="/committee/globalsg">Global SG</router-link></li>
			<li><router-link to="/committee/housinganddining">Housing &amp; Dining</router-link></li>
			<li><router-link to="/committee/studentaffairs">Student Affairs</router-link></li>
			<li><router-link to="/committee/technology">Technology</router-link></li>
			<li><router-link to="/committee/sustainability">Sustainability</router-link></li>
			<li><router-link to="/committee/senator">Senator</router-link></li>
			<li><router-link to="/committee/rso">RSO</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'committees-menu',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

#committee_bar {
	background-color: #ccc;
	color: #333;
	font-weight: 300;
	text-transform: uppercase;
	padding: 5px 0;
}

#committee_bar ul {
	list-style: none;
	text-align: center;
	padding: 0;
}

#committee_bar ul li {
	padding: 0 15px;
	display: inline;
}
</style>
