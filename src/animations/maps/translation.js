const translationMap = (distance, back) => ({
  bottom: {
    beforeEnter: {
      translateY: `${distance}em`
    },
    leave: {
      translateY: back ? `${distance / 2}em` : `${-distance / 2}em`
    }
  },
  top: {
    beforeEnter: {
      translateY: `${-distance}em`
    },
    leave: {
      translateY: back ? `${-distance / 2}em` : `${distance / 2}em`
    }
  },
  left: {
    beforeEnter: {
      translateX: `${-distance}em`
    },
    leave: {
      translateX: back ? `${-distance / 2}em` : `${distance / 2}em`
    }
  },
  right: {
    beforeEnter: {
      translateX: `${distance}em`
    },
    leave: {
      translateX: back ? `${distance / 2}em` : `${-distance / 2}em`
    }
  }
})

export default translationMap
