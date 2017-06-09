<template>
  <transition name="zoom">
    <div>
      <canvas id="canvas" width="50" height ="50"></canvas>
    </div>
  </transition>
</template>

<script>
export default {
  mounted () {
    const canvas = this.$el.children[0]
    const context = canvas.getContext('2d')

    const radius = canvas.width / 3
    const angleStep = Math.PI * 2 / 360
    let theta = 0

    const frequencyX = 5
    const frequencyY = 5

    window.requestAnimationFrame(draw)

    function draw () {
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)

      context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2)
      context.beginPath()

      for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
        const x = Math.sin(angle * frequencyX + theta) * Math.cos(angle + theta) * radius
        const y = Math.cos(angle * frequencyY) * Math.sin(angle + theta) * radius
        if (angle === 0) {
          context.moveTo(x, y)
        } else {
          context.lineTo(x, y)
        }
      }

      context.lineWidth = 2
      context.strokeStyle = 'hsl(150,80%,50%)'
      context.stroke()
      context.miterLimit = 0.1
      context.closePath()

      theta += 0.04
      window.requestAnimationFrame(draw)
    }
  }
}
</script>

<style lang="stylus">
canvas
  position relative
  left 0
  right 0
  margin auto
</style>
