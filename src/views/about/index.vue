<script setup lang="ts"></script>

<template>
    <div class="about w-full flex justify-center items-center max-w-242 pt-39  pb-15">
      <div class="about-top w-full">
        <div class="about-name">李依恒</div>
        <div class="about-info"></div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../styles/public-mixin.scss' as *;
.about {
  .about-top {
    .about-name {
      @include titleBgc
    }
  }
}
</style>
