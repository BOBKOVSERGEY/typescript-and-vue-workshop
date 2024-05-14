import { defineStore } from "pinia";
import type {Restaurant} from "@/types/types";
import {computed, ref} from "vue";

export const useRestaurantStore = defineStore("restaurant", () => {

    const showNewForm = ref<boolean>(false);
    const filterText = ref<string>('');
    const restaurants = ref<Restaurant[]>([
        {
            id: '9f995ce4-d2fc-4d00-af1d-6cb1647c6bd3',
            name: 'Quiche From a Rose',
            address: '283 Thisisnota St.',
            website: 'www.quichefromarose.com',
            status: 'Want to Try',
        },
        {
            id: 'ae62a3da-791b-4f44-99a1-4be1b0ec30b8',
            name: 'Tamago Never Dies',
            address: '529 Letsgofora Dr.',
            website: 'www.tamagoneverdies.com',
            status: 'Recommended',
        },
        {
            id: '9b361dae-2d44-4499-9940-97e188d41a32',
            name: 'Penne For Your Thoughts',
            address: '870 Thisisa St.',
            website: 'www.penneforyourthoughts.com',
            status: 'Do Not Recommend',
        },
    ]);

    const filteredRestaurantList = computed((): Restaurant[]  => {
        return restaurants.value.filter((restaurant: Restaurant) => {
            if (restaurant.name) {
                return restaurant.name.toLowerCase().includes(filterText.value.toLowerCase())
            } else {
                return restaurants.value
            }
        })
    });

    const numberOfRestaurants = computed((): number => {
        return filteredRestaurantList.value.length
    });

    const hideForm = () => {
        showNewForm.value = false
    }
    const addRestaurant = (payload: Restaurant) => {
        restaurants.value.push(payload)
        hideForm()
    }

    const deleteRestaurant = (payload: Restaurant) => {
        restaurants.value = restaurants.value.filter((restaurant) => {
            return restaurant.id !== payload.id
        })
    }

    return {
        showNewForm,
        filterText,
        filteredRestaurantList,
        numberOfRestaurants,
        hideForm,
        addRestaurant,
        deleteRestaurant,
    };
});