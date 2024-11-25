let darkMode = localStorage.getItem('dark-mode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkMode = () => {
  document.documentElement.classList.add('dark-mode')
  localStorage.setItem('dark-mode', 'active')
}

const disableDarkMode = () => {
  document.documentElement.classList.remove('dark-mode')
  localStorage.setItem('dark-mode', null)
}

if (darkMode === 'active') enableDarkMode()

themeSwitch.addEventListener("click", () => {
  darkMode = localStorage.getItem('dark-mode')
  darkMode !== "active" ? enableDarkMode() : disableDarkMode()
})
