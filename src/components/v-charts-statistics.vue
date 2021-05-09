<template>
    <div class="v-charts-statistics">
        <vScatterStatistics />
    </div>
</template>

<script>
import vScatterStatistics from "./charts/v-scatter-statistics"
export default {
    name: 'v-charts-statistics',

    components: {
        vScatterStatistics
    }
}
</script>