<template>
  <div class="product-detail">
    <div class="row">
      <div class="col-12">
        <h6 class="text-uppercase">ÇOK SATANLAR</h6>
        <h2 class="product-title">{{ product?.title || 'Loading...' }}</h2> 
        <h3 class="product-price">{{ product?.price }} TL</h3> 
        <p class="product-description">{{ product?.description }}</p>  
        <p class="product-discount">
          <span style="color: brown;">{{ product?.discountedPrice }} TL</span>
        </p>
      </div>
    </div>

    <div class="row align-items-center">
      <div class="col-6">
        <p><strong>{{ product?.color || 'Bordo' }}</strong> | 23F1XD83</p>
        <div class="color-options">
          <span class="color-circle bg-bordo"></span>
          <span class="color-circle bg-black"></span>
          <span class="color-circle bg-beige"></span>
        </div>
      </div>
      <div class="col-6 text-end">
        <a href="#" class="size-table-link">ÖLÇÜ TABLOSU</a>
      </div>
    </div>

    <div class="row">
      <div class="col-12 size-options">
        <button class="btn btn-outline-dark">S</button>
        <button class="btn btn-outline-dark">M</button>
        <button class="btn btn-outline-dark">L</button>
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
        <button class="btn btn-dark w-100" @click="addToCart" >SEPETE EKLE</button>
      </div>
    </div style="padding-top:50px">
    <Accardion />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '~/stores/products';  // Pinia store'u import et
import { useCartStore } from '~/stores/cart'; 


// Sepete ürün ekleme fonksiyonu
const route = useRoute();  // Route'dan ürün ID'sini almak için
const product = ref(null);  // Ürün bilgisini tutan ref
const loading = ref(true);
const productsStore = useProductsStore();
const cartStore = useCartStore();  

const { fetchProductById } = useProductsStore();  // Pinia store'dan ürün çekme fonksiyonu

// OnMounted hook'u ile ürünü ID'ye göre çekme
onMounted(async () => {
  const id = route.params.id;  // Route parametrelerinden ID'yi al
  console.log("Product ID:", id);  
  product.value = await fetchProductById(id);  // Ürünü store'dan çek
  loading.value = false;  // Yükleniyor durumu bitti
});
const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value); // Sepete ürün ekle
  }
};
// Ürünü sepete ekleme fonksiyonu

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
  </style>
  