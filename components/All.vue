<template>
  <div class="row justify-content-center">
    <div v-for="(item, index) in products" :key="item.id" class="product">
      <div :id="'carouselExampleInterval' + index" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="carousel-image-container" @click="$emit('navigate', item.id)" style="cursor: pointer;">
              <img :src="item.images[item.currentImageIndex]" class="d-block w-100" alt="...">
              <div class="size-box">
                <p>S&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L</p>
              </div>
            </div>
            <div class="product-info">
              <p style="font-family: Open Sans Condensed, sans-serif; font-size: 13px; font-weight: 700; padding-top: 10px;">
                {{ item.title }}
              </p>
              <p style="font-family: Open Sans Condensed, sans-serif; font-size: 13px; font-weight: 700;">
                {{ item.price }} TL
              </p>
              <p v-if="item.indirimli > 0" class="indirim-text">
                SEPETTE {{ item.indirimli }} TL
              </p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" :data-bs-target="'#carouselExampleInterval' + index" data-bs-slide="prev" @click="$emit('prevImage', index)">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" :data-bs-target="'#carouselExampleInterval' + index" data-bs-slide="next" @click="$emit('nextImage', index)">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  }
});

defineEmits(['navigate', 'nextImage', 'prevImage']);
</script>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
  overflow-x: hidden; /* Yatay kaydırmayı engelle */
}

.row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 100%;
  overflow: hidden; /* Fazladan kaydırmayı engelle */
}

.product {
  width: calc(25% - 10px); /* Her bir ürün için %25 genişlik */
  min-width: 80px;
}

#carouselExampleInterval {
  position: relative;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  padding-left: 25px;
  width: 100%;
  height: auto; /* İçeriğe göre yükseklik belirle */
  overflow-x: hidden; /* Yatay kaydırmayı engelle */
}

.carousel-image-container {
  position: relative;
}

.size-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  text-align: center;
  padding: 10px;
  display: none;
}

.carousel-item:hover .size-box {
  display: block;
}

.size-box p {
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 13px;
  font-weight: 700;
  margin: 0;
}

.product-info {
  text-align: left;
  padding: 10px 0;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease, visibility 0.3s;
  opacity: 0;
  visibility: hidden;
}

.carousel:hover .carousel-control-prev,
.carousel:hover .carousel-control-next {
  opacity: 1;
  visibility: visible;
}

.carousel-control-prev {
  left: -1px;
  top: 175px;
}

.carousel-control-next {
  right: -1px;
  top: 175px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  color: white;
  width: 20px;
  height: 20px;
  background-color: transparent;
}

.carousel-control-prev-icon::before,
.carousel-control-next-icon::before {
  color: white;
}

.indirim-text {
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: brown;
  position: relative;
  margin-left: 20px;
}

.indirim-text::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 100%;
  background-color: brown;
  position: absolute;
  left: -10px;
  top: 0;
}


</style>
