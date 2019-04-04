<template>
    <div>
        <HeaderMenu />
        <CommitteesMenu />
        <h2>Whoops! Page not found.</h2>
        <iframe class="not_found" src="https://www.youtube.com/embed/t3otBjVZzT0?&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu'
import CommitteesMenu from '../components/CommitteesMenu'

export default {
  name: 'dashboard',
  components: {
    'HeaderMenu': HeaderMenu,
    'CommitteesMenu': CommitteesMenu
  }
}
</script>
<style scoped>
  h2{
    text-align: center;
  }
  .not_found{
    text-align: center;
    display: block;
    width: 500px;
    height: 300px;
    margin: 0 auto;
  }
</style>
