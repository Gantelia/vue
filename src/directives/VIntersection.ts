export default {
  mounted(el: HTMLDivElement, binding: { value: () => Promise<void> }) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: "intersection",
};
