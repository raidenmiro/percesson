import { createMemo } from 'solid-js'
import { breakpoint, convert } from '../../../shared/lib/breakpoints'

export interface Props {
  url: { small: string; regular: string; raw: string }
  name: string
}

const scheme = {
  xs: 1079,
  md: [1080, 1919],
  xl: 1920,
}

export const BackdropPhoto = (props: Props) => {
  const unit = createMemo(() => convert.all(scheme, convert.units.px))
  const { up, down } = breakpoint.matcher

  return (
    <div class="fixed top-0 left-0 min-w-full min-h-full">
      <picture>
        <source srcset={props.url.small} media={down(unit().xs)} />
        <source srcset={props.url.regular} media={breakpoint.merge(up(unit().md[0]), down(unit().md[1]))} />
        <source srcset={props.url.raw} media={up(unit().xl)} />
        <img class="w-full h-full object-cover" draggable={false} src={props.url.regular} alt={props.name} />
      </picture>
    </div>
  )
}
