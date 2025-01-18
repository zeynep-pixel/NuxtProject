<template>
  <div class="product-detail">
    <div class="row">
      <div class="col-12">
        <h6 v-if="product?.mainPage" class="text-uppercase">ÇOK SATANLAR</h6>
        <h2 class="product-title">{{ product?.title || 'Loading...' }}</h2>
        <h3 class="product-price">{{ product?.price }} TL</h3>
        <p class="product-description">{{ product?.detail }}</p>
        <p v-if="product.indirimli > 0" class="product-discount">
          <span style="color: brown;">{{ product?.indirimli }} TL</span>
        </p>
      </div>
    </div>

 
    <div v-if="sizeError" class="size-error">
      <i class="bi bi-exclamation-triangle-fill"></i> Lütfen bir beden seçiniz.
    </div>

    <div class="row">
      <div class="col-12 size-options">
        <div class="size-buttons">
          <button
            v-for="(size, index) in product.size"
            :key="index"
            class="btn"
            :class="{ 'btn-dark': size === selectedSize, 'btn-outline-dark': size !== selectedSize }"
            @click="selectSize(size)"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12">
        <p class="installment-info">
          <i class="bi bi-credit-card"></i> VADE FARKSIZ PEŞİN FİYATINA 3 TAKSİT FIRSATI!!
        </p>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <button class="btn btn-dark w-100" @click="onAddToCart">
          <div v-if="isAdded">SEPETE EKLENDİ</div>
          <div v-else>SEPETE EKLE</div>
        </button>
      </div>
    </div>

    <div style="padding-top: 30px;">
      <Accardion />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Emit'i tanımlıyoruz
const emit = defineEmits();

const sizeError = ref(false);
const isAdded = ref(false);
const selectedSize = ref<string | null>(null);

// Beden seçme fonksiyonu
const selectSize = (size: string) => {
  selectedSize.value = size;
  isAdded.value = false;
};

// Sepete ekleme fonksiyonu
const onAddToCart = () => {
  if (!selectedSize.value) {
    sizeError.value = true;
    return;
  }
  sizeError.value = false;
  isAdded.value = true;

  const cartItem = {
    ...props.product,
    selectedSize: selectedSize.value,  // Seçilen beden
  };

  // Ebeveyn bileşene add-to-cart olayı ile veriyi gönder
  emit('add-to-cart', cartItem);
    // CartItem'ı gönderiyoruz
};
</script>


  <style scoped>
  .product-detail {
    
    width: 500px;
  }
  
  .product-title {
    font-size: 18px;
    font-weight: bold;
  }
  
  .product-price {
    font-size: 22px;
    font-weight: bold;
    color: black;
  }
  
  .product-discount {
    font-size: 16px;
    margin-top: -5px;
  }
  
  .product-description {
    font-size: 14px;
    color: black;
    font-weight: bold;
  }
  
  .color-options {
    display: flex;
    gap: 10px;
  }
  
  .color-circle {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ddd;
    cursor: pointer;
  }
  
  .bg-bordo {
    background-color: #800020;
  }
  
  .bg-black {
    background-color: black;
  }
  
  .bg-beige {
    background-color: #f5f5dc;
  }
  
  .size-options {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .size-options .btn {
    width: 50px;
  }
  
  .size-table-link {
    font-size: 12px;
    color: #555;
    text-decoration: underline;
    cursor: pointer;
  }
  
  .installment-info {
    font-size: 13px;
    color: #555;
    display: flex;
    align-items: center;
    gap: 5px;
  }

 
.size-buttons .btn {
  margin-right: 10px; 
  margin-bottom: 10px; 
}

.size-buttons .btn:last-child {
  margin-right: 0;
}

  </style>
  