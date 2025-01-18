<template>
  <div class="row justify-content-center">
    <div v-for="(item, index) in products" :key="index" class="product">
      <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="carousel-image-container" @click="navigateToProduct(item.id)" style="cursor: pointer;">
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
              <p class="indirim-text">
                SEPETTE {{ item.indirimli }} TL
              </p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev" @click="prevImage(index)">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next" @click="nextImage(index)">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const navigateToProduct = (id) => {
  router.push(`/product/${id}`); // Redirect to product detail page
};

const nextImage = (index) => {
  const product = props.products[index];
  if (product && product.images && product.currentImageIndex < product.images.length - 1) {
    product.currentImageIndex++;
  } else {
    product.currentImageIndex = 0; // Loop back to the first image
  }
};

const prevImage = (index) => {
  const product = props.products[index];
  if (product && product.images && product.currentImageIndex > 0) {
    product.currentImageIndex--;
  } else {
    product.currentImageIndex = product.images.length - 1; // Loop back to the last image
  }
};
</script>


<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.product {
  width: calc(20% - 10px); 
  min-width: 80px;
}
#carouselExampleInterval {
  position: relative;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-x: hidden;
  padding-top: 100px;
  padding-left: 25px;
  width: 100%;
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
  margin-left: 20px; /* Dikdörtgenin yanında boşluk bırakır */
}

.indirim-text::before {
  content: "";
  display: inline-block;
  width: 4px; /* Dikdörtgenin genişliği */
  height: 100%; /* Metnin yüksekliği kadar */
  background-color: brown; /* Aynı renk */
  position: absolute;
  left: -10px; /* Metinle dikdörtgen arasındaki boşluk */
  
  top: 0;
}
</style> 