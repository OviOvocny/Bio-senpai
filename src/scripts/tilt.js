export default function tilt (e) {
  if (window.matchMedia('(prefers-reduced-motion)').matches) return
  let t = e.currentTarget
  let hc = t.clientWidth / 2
  let vc = t.clientHeight / 2
  let rect = t.getBoundingClientRect()
  let x = e.pageX - window.scrollX - rect.left
  let y = e.pageY - window.scrollY - rect.top
  t.style.setProperty('--tilt-x', `${(-hc + x) / 20}deg`)
  t.style.setProperty('--tilt-y', `${(vc - y) / 10}deg`)
  t.style.setProperty('--parallax-x', (-hc + x) / 20)
  t.style.setProperty('--parallax-y', (vc - y) / 10)
}
