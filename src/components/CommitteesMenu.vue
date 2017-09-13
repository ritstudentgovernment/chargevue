<template>
  <div id="committee_bar" class="committees-menu">
    <ul>
			<li><router-link to="/committee/academicsandcoop">Academic &amp; Coops</router-link></li>
			<li>Deaf Advocacy</li>
			<li>Parking &amp; Trans</li>
			<li>Global SG</li>
			<li>Housing &amp; Dining</li>
			<li>Student Affairs</li>
			<li>Technology</li>
			<li>Sustainability</li>
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
