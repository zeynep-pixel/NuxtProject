<template>
  <img 
  src="//toucheprive.com/cdn/shop/files/bti_2025_deskt_1024x1024.png?v=1736259823" 
  style="width: 100%; height: fit-content " 
  alt="Touche Prive Image"
/>
  <div class="card-container">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card"
      @click="handleCardClick(card.link)"
    >
      <img :src="card.imgSrc" alt="Card Image" class="card-image" />
    </div>
  </div>
  <img 
  src="//toucheprive.com/cdn/shop/files/deskbanner_coksatanlar_0701_1024x1024.png?v=1736261169" 
  style="width: 100%; height: fit-content ; padding-top: 60px;" 
  alt="Touche Prive Image"
/>




  <div class="card-container">
    <div
      v-for="(card, index) in cards2"
      :key="index"
      class="card"
      @click="handleCardClick(card.link)"
    >
      <img :src="card.imgSrc" alt="Card Image" class="card-image" />
    </div>
  </div>
  

  
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { imgSrc: "https://toucheprive.com/cdn/shop/files/onlinesub_triko_tr_bti_900x.png?v=1736261158", link: "https://toucheprive.com/cdn/shop/files/onlinesub_triko_cyber_900x.png?v=1733211762" },
        { imgSrc: "https://toucheprive.com/cdn/shop/files/onlinesub_disgiyim_tr_bti_900x.png?v=1736261169", link: "https://example.com/2" },
        
      ],
      cards2:[
      { imgSrc: "https://toucheprive.com/cdn/shop/files/onlinesub_sweat_cyber_900x.png?v=1733211762", link: "https://example.com/3" },
      { imgSrc: "https://toucheprive.com/cdn/shop/files/onlinesub_takim_cyber_900x.png?v=1733211761", link: "https://example.com/4" },
      ]
    };
  },
  methods: {
    handleCardClick(link) {
      window.open(link, "_blank"); 
    },
  },
};
</script>

<style scoped>

.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 30px; 
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto; 
  padding-top: 100PX;
}


.card {
  cursor: pointer;
  overflow: hidden;
  border-radius: 0; 
  border: none; 

}


.card-image {
  width: 100%;
  height: auto;
  border-radius: 0;
  border: none; 
}
</style>