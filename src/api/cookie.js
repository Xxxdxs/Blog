import Cookie from 'js-cookie'

export default {
  setAttribute (key, value, day) {
    return day
      ? Cookie.set(key, value, {expires: day})
      : Cookie.set(key, value)
  },
  getAttribute (key) {
    return Cookie.get(key)
  },
  remove (key) {
    return Cookie.remove(key)
  }
}
