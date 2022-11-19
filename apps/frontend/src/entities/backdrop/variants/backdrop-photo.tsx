import { useUnit } from 'effector-solid'
import { Match, onMount, Switch } from 'solid-js'
import type { Unsplash } from '../../../shared/api/internal'
import { breakpoint, convert } from '../../../shared/lib/breakpoints'
import { $photo, started } from '../model'

const scheme = {
  xs: 1079,
  md: [1080, 1919],
  xl: 1920,
}

export const BackdropPhoto = () => {
  const photo = useUnit($photo)

  const unit = convert.all(scheme, convert.units.px)
  const { up, down } = breakpoint.matcher

  onMount(() => started())

  return (
    <Switch fallback={<div></div>}>
      <Match when={isPhotoProvided(photo())} keyed>
        {({ id, urls }) => (
          <div class="fixed top-0 left-0 min-w-full min-h-full -z-10">
            <picture>
              <source srcset={urls.small} media={down(unit.xs)} />
              <source srcset={urls.regular} media={breakpoint.merge(up(unit.md[0]), down(unit.md[1]))} />
              <source srcset={`${urls.raw}&q=80&w=1920`} media={up(unit.xl)} />
              <img class="w-full h-full object-cover" draggable={false} src={urls.regular} alt={id} />
            </picture>
          </div>
        )}
      </Match>
    </Switch>
  )
}

const isPhotoProvided = (photo: Unsplash | null): Unsplash | false => (photo !== null ? photo : false)
