function groupBlogs (blogs) {
  function getMonth (date) {
    return date.slice(0, 7)
  }

  const ret = []
  let j = 0
  if (!blogs.length) {
    return
  }
  for (let i = 0; i < blogs.length; i++) {
    if (i === 0) {
      ret[j] = {}
      ret[j].date = getMonth(blogs[i].createdAt)
      ret[j].list = []
      ret[j].list.push({
        id: blogs[i].id,
        number: blogs[i].number,
        title: blogs[i].title
      })
      continue
    }
    if (getMonth(blogs[i].createdAt) === getMonth(blogs[i - 1].createdAt)) {
      ret[j].list.push({
        id: blogs[i].id,
        number: blogs[i].number,
        title: blogs[i].title
      })
    } else {
      j++
      ret[j] = {}
      ret[j].date = getMonth(blogs[i].createdAt)
      ret[j].list = []
      ret[j].list.push({
        id: blogs[i].id,
        number: blogs[i].number,
        title: blogs[i].title
      })
    }
  }
  return ret
}

export {
  groupBlogs
}
