<script setup >
import { computed, onMounted, ref } from 'vue';
import Explore from '../components/Explore.vue';
import UserIdCard from '../components/UserIdCard.vue';



const time = ref(new Date());

const icon = computed(()=>{
    const hour  = time.value.getHours();

    if(hour >= 4 && hour < 17)
        return 'bx-sun'
    else if(hour >= 17 && hour < 22)
        return'bx-cloud'
    else
        return 'bx-moon'
});

const greeting = computed(()=>{
    const hour  = time.value.getHours();

    if(hour >= 4 && hour < 12)
        return 'صباح الخير'
    else if(hour >= 12 && hour < 17)
        return 'نهارك سعيد'
    else if(hour >= 17 && hour < 22)
        return'مساء الخير'
    else
        return 'ليلة سعيدة'
});


onMounted(()=>{
    setInterval(()=>{
        time.value = new Date();
    }, 60*1000);
})


</script>

<template>
        <div class="pb-28 md:w-full">
            <div id="div" class=" bg-linear-to-r from-primary to-gradient relative p-6 h-[185px] w-full bg-primary rounded-bl-xl rounded-br-xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <i class='bx text-back text-xl' :class="icon" ></i>
                        <h3 class="text-xs font-normal text-back">{{ greeting }}</h3>
                        
                    </div> 
                    <router-link to="/search" class='bx bx-search-alt text-xl text-back cursor-pointer transition-colors hover:text-primary-light' ></router-link>
                </div>
                
                <UserIdCard></UserIdCard>
            </div>

            <Explore></Explore>
        </div>
</template>