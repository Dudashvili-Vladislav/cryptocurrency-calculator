<template>
    <label class="v-amount">
        <div class="amount-label" >{{ label }} </div>
        <div class="amount__wrapper">
            <input
                type="number"
                min="0"
                name="money"
                placeholder="0"
                class="amount w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                v-model="valueSetter"
            />
<!--            @input="throttledSave"-->
        </div>
        <div class="absolute top-0 left-0 mt-3 ml-1 text-gray-400"></div>
        <span class="text-sm text-red-600 hidden" id="error"></span>
    </label>
</template>

<script>
import throttle from "../../../throttle.js";

export default {
    name: "v-amount",

    //emits: ["upAmount", "update:modelValue"],

    props: {
        value: {
            type: Number,
            default: 0,
        },
        label: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            amountCount: null,//this.modelValue,
            timerId: null,
        };
    },
    computed: {
        valueSetter: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v)
            }
        }
    },

    // watch: {
    //     amountCount() {
    //         this.$emit("update:modelValue", Number(this.amountCount));
    //     },
    //
    //     modelValue(newValue) {
    //         this.amountCount = newValue;
    //     },
    // },

    // methods: {
    //     throttledSave() {
    //         let DELAY = 1000; // Задержка
    //
    //         clearTimeout(this.timerId);
    //         this.timerId = setTimeout(() => {
    //             this.$emit("upAmount", this.amountCount);
    //         }, DELAY);
    //     },
    // },
};
</script>
<style scoped>
.amount__wrapper {
    position: relative;
}

.amount__wrapper:after {
    content: '';
    display: block;
    position: absolute;
    pointer-events: none;
}

.amount {
    background: none;
    border: 1px solid rgba(65, 54, 241, 1);
    color: #ffffff;
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    opacity: 0.5;
    margin-top: 10px;
    border-radius: 4px;
    height: 44px;
}

.amount-label {
    color: white;
    margin-left: 2px;
    font-family: Gilroy;
}
</style>
