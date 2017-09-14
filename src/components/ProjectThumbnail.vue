<!--

filename: ProjectThumbnail.vue
description: Thumbnail component for projects, for use on dashboard and committee pages

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div class="project-thumbnail">
    <div class="project_thumbnail">
 			<div class="project_thumbnail_header">Gender Neutral Bathrooms</div>
				<div class="project_thumbnail_subheader">Last updated on: 3/7/2017</div>
				<div class="project_thumbnail_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit scelerisque neque eget rutrum. Aenean mollis ac turpis nec dapibus. Ut mollis semper velit vel semper. In fermentum, massa vel venenatis aliquet, justo mi pretium felis, ut porttitor dui tortor ut elit. Proin nec vestibulum lacus. Vivamus ultrices, nisl ac luctus tincidunt, nisi ex elementum augue, sed tristique arcu leo in ex. Quisque sed sapien id libero consequat venenatis. Aliquam sit amet ante sit amet arcu condimentum auctor. Morbi in erat volutpat ligula venenatis porttitor. Sed ac porta quam. Fusce eleifend scelerisque velit, eu feugiat odio sollicitudin et.</div>
			</div>
  </div>
</template>

<script>
export default {
  name: 'project-thumbnail',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.project_thumbnail {
  background-color: #fff;
  width: 70%;
  margin: 15px auto;
  padding: 20px;
}

.project_thumbnail_header {
  color: #FD9131;
  font-size: 16pt;
  font-weight: 300;
}

.project_thumbnail_subheader {
  color: #333;
  font-size: 10pt;
  font-weight: 300;
  font-family: Verdana;
}

.project_thumbnail_description {
  color: #333;
  font-size: 10pt;
  font-weight: 300;
  font-family: Verdana;
  margin-top: 10px;
}
</style>
