const translationMap = (distance, back) => ({
  bottom: {
    beforeEnter: {
      translateY: `${distance}em`
    },
    leave: {
      translateY: back ? `${distance}em` : `${-distance}em`
    }
  },
  top: {
    beforeEnter: {
      translateY: `${-distance}em`
    },
    leave: {
      translateY: back ? `${-distance}em` : `${distance}em`
    }
  },
  left: {
    beforeEnter: {
      translateX: `${-distance}em`
    },
    leave: {
      translateX: back ? `${-distance}em` : `${distance}em`
    }
  },
  right: {
    beforeEnter: {
      translateX: `${distance}em`
    },
    leave: {
      translateX: back ? `${distance}em` : `${-distance}em`
    }
  }
})

export default translationMap
