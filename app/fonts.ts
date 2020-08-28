import FontFaceObserver from 'fontfaceobserver'

const Fonts: () => void = () => {
  const link = document.createElement('link')
  link.href =
    'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&family=Source+Sans+Pro&family=Raleway:wght@600&display=swap'
  link.rel = 'stylesheet'

  document.head.appendChild(link)

  const raleway = new FontFaceObserver('Raleway')
  const sourceSansPro = new FontFaceObserver('Source Sans Pro')
  const assistant = new FontFaceObserver('Assistant')

  raleway.load().then(() => {
    document.documentElement.classList.add('raleway')
  })
  sourceSansPro.load().then(() => {
    document.documentElement.classList.add('source-sans-pro')
  })
  assistant.load().then(() => {
    document.documentElement.classList.add('assistant')
  })
}

export default Fonts
