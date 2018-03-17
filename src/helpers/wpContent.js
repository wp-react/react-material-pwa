import {randomItem} from './randomItem'
const root = process.env.ROOT
const site = process.env.SITE

export const placeHolderImg = [
  `${root}images/placeholder/sc9Img1.jpg`,
  `${root}images/placeholder/sc9Img2.jpg`,
  `${root}images/placeholder/sc9Img3.jpg`,
  `${root}images/placeholder/sc9Img4.jpg`,
  `${root}images/placeholder/sc9Img5.jpg`,
  `${root}images/placeholder/sc9Img6.jpg`,
  `${root}images/placeholder/sc9Img7.jpg`,
  `${root}images/placeholder/sc9Img8.jpg`,
  `${root}images/placeholder/sc9Img9.jpg`
]

export const wpContent = (value) => {
  return {
    title: value.title.rendered,
    link: value.link.replace(`${site}`, ''),
    body: value.excerpt.rendered,
    image: (value.better_featured_image ? value.better_featured_image.media_details.sizes['medium_large'].source_url : randomItem(placeHolderImg))
  }
}
