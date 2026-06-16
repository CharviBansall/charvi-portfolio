import Image from 'next/image'
import {
  imageWrapperClasses,
  imageClasses,
  logoClasses,
} from '../data/card-visuals'

export default function CardMedia({ image, logo }) {
  if (!image && !logo) return null

  return (
    <>
      {image && (
        <div className={imageWrapperClasses(image)}>
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            fill={image.position !== 'top'}
            width={image.position === 'top' ? 400 : undefined}
            height={image.position === 'top' ? 128 : undefined}
            className={imageClasses(image)}
            sizes={
              image.fillCard || image.position === 'cover'
                ? '400px'
                : image.position === 'top'
                  ? '(max-width: 768px) 100vw, 400px'
                  : '(max-width: 1200px) 50vw, 33vw'
            }
            priority={image.priority}
          />
          {image.position === 'background' && (
            <div
              className="absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none"
              aria-hidden
            />
          )}
        </div>
      )}

      {logo && (
        <Image
          src={logo.src}
          alt={logo.alt ?? ''}
          width={logo.width ?? 48}
          height={logo.height ?? 48}
          className={logoClasses(logo)}
        />
      )}
    </>
  )
}
