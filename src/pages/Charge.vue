<!--

filename: Charge.vue
description: Page for an indiviudual charge

author: Gabe Landau <gll1872@rit.edu>

-->

<template>
  <div>
    <HeaderMenu />
    <CommitteesMenu />
    <div class="charge_header">
      <div class="charge_header_text">Gender Neutral Bathrooms</div>
      <div class="charge_header_tag"><span>Student Affairs</span></div>
    </div>
    <ChargeStatusBar />
    <div class="description">
      <div class="columns">
        <div class="column">
          <div class="description_title">Purpose</div>
        </div>
        <div class="column">
          <div class="description_date">9/20/17</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="description_content">Students gender neutral bathrooms. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat pretium sem, id accumsan mauris consequat at. Nam dolor velit, efficitur id malesuada ac, sodales at ligula. Vivamus convallis enim id risus elementum, eget mattis ante hendrerit.</div>
    </div>
    <div class="tasks">

    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'
import ChargeStatusBar from '../components/ChargeStatusBar'

export default {
  name: 'dashboard',
  components: {
    'HeaderMenu': HeaderMenu,
    'CommitteesMenu': CommitteesMenu,
    'ChargeStatusBar': ChargeStatusBar
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.description {
  background-color: #fff;
  border: 1px solid #ddd;
  width: 70%;
  margin: 50px auto 0 auto;
  padding: 10px;
}

.charge_header {
  background-color: #fff;
  text-align: center;
  padding: 20px;
}

.charge_header_text {
  font-size: 24pt;
  color: #FD9131;
  font-weight: 500;
}

.charge_header_tag {
  color: #fff;
  font-size: 12pt;
  text-transform: uppercase;
  font-weight: 400;
  margin-top: 30px;
}

.charge_header_tag span {
  background-color: #FD9131;
  padding: 5px;
}

.description_title {
  text-align: left;
  font-size: 18pt;
}

.description_date {
  text-align: right;
  font-size: 14pt;
  color: #555;
}

.description_content {
  font-size: 13pt;
  padding: 10px;
}

.columns {
  padding: 0;
  margin: 0;
}

.divider {
  border-top: 1px solid #000;
}

.tasks {
  background-color: #fff;
  border: 1px solid #ddd;
  width: 70%;
  margin: 20px auto;
  padding: 10px;
}
</style>
