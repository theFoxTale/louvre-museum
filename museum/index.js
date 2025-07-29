
function clickSlider(slider) {
    const value = slider.value;
    slider.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, var(--slider-grey) ${value}%, var(--slider-grey) 100%)`;
}
