const playProgress = document.querySelector('.play-progress');

playProgress.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, var(--slider-grey) ${value}%, var(--slider-grey) 100%)`
})

const volumeProgress = document.querySelector('.volume-progress');

volumeProgress.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${value}%, var(--slider-grey) ${value}%, var(--slider-grey) 100%)`
})
