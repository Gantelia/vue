import { DialogComponent } from "@/types/component";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      (this as DialogComponent).$emit("update:show", false);
    },
  },
  emits: ["update:show"],
  mounted() {
    console.log("mixin mounted");
  },
};
