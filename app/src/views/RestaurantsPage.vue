<script setup lang="ts">
import NewRestaurantForm from '../components/NewRestaurantForm.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRestaurantStore } from "@/stores/RestaurantStore";

const route = useRoute();
const restaurantStore = useRestaurantStore();

onMounted(() => {
  if (route.query.new) {
    restaurantStore.showNewForm = true
  }
})

</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Restaurants</h1>

        <!-- CTA Bar -->
        <nav v-if="!restaurantStore.showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ restaurantStore.numberOfRestaurants }}</strong> restaurants
              </p>
            </div>

            <p class="level-item">
              <button @click="restaurantStore.showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Restaurant name" v-model="restaurantStore.filterText" />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Restaurant Form -->
        <NewRestaurantForm
            v-if="restaurantStore.showNewForm"
            @add-new-restaurant="restaurantStore.addRestaurant"
            @cancel-new-restaurant="restaurantStore.hideForm" />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in restaurantStore.filteredRestaurantList" class="column is-full" :key="`item-${item}`">
            <RestaurantCard :restaurant="item" @delete-restaurant="restaurantStore.deleteRestaurant" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

