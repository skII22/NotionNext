import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 关联推荐文章
 * @param {prev,next} param0
 * @returns
 */
export default function BlogRecommend(props) {
  const { recommendPosts, siteInfo } = props
  const { locale } = useGlobal()
  if (
    !siteConfig('PHOTO_ARTICLE_RECOMMEND', null, CONFIG) ||
    !recommendPosts ||
    recommendPosts.length === 0
  ) {
    return <></>
  }

  return (
    <div className='py-8'>
      <div className=' mb-2 px-1 flex flex-nowrap justify-between'>
        <div className='dark:text-gray-300'>
          <i className='mr-2 fas fa-thumbs-up' />
          {locale.COMMON.RELATE_POSTS}
        </div>
      </div>
      <div className='flex flex-nowrap gap-4'>
        {recommendPosts.map(post => {
          const headerImage = post?.pageCoverThumbnail
            ? post.pageCoverThumbnail
            : siteInfo?.pageCover

          return (
            <SmartLink
              key={post.id}
              title={post.title}
              href={post?.href}
              passHref
              className='flex rounded-lg h-60 w-48 cursor-pointer overflow-hidden'>
              <div className='h-full w-full relative group shadow-movie'>
                <div className='absolute bottom-4 w-full z-20 duration-300 '>
                  <div className='z-10 text-lg px-4 font-bold text-white shadow-text select-none'>
                    {post.title}
                  </div>
                </div>
                {/* 卡片的阴影遮罩，为了凸显图片上的文字 */}
                <div className='h-3/4 w-full absolute left-0 bottom-0 z-10'>
                  <div className='h-full w-full absolute opacity-80 group-hover:opacity-100 transition-all duration-1000 bg-gradient-to-b from-transparent to-black'></div>
                </div>

                <LazyImage
                  src={headerImage}
                  className='absolute top-0 w-full h-full object-cover object-center group-hover:scale-110 group-hover:brightness-50 transform duration-200'
                />
              </div>
            </SmartLink>
          )
        })}
      </div>
    </div>
  )
}
