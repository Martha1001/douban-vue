<template>
  <div class="home-list">
    <ul>
      <li>
        <router-link to="/">
          <div>
            <div>
              <img src="../assets/avatar.png" alt="">
            </div>
            <h3>title</h3>
            <p>txt</p>
          </div>
          <div>
            <span class="author">by.</span>
            <span class="feed">from.</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>

</template>
<script>

</script>

<style scoped>
  .home-list li{
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
</style>