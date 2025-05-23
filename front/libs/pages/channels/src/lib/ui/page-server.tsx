// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  MembersNavigationFeature,
} from '@beep/layout'
import { leftPaneState, rightPaneState } from '@beep/responsive'
import { cn } from '@beep/utils'
import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router'
import { SoundManager } from './sound-manager'
import { ChannelsNavigationFeature } from '../feature/channels-navigation-feature'

export function PageServer() {
  const rightDivState = useSelector(rightPaneState)
  const leftDivState = useSelector(leftPaneState)
  const { serverId } = useParams<{ serverId: string }>()
  return (
    <div className={cn('flex flex-row h-dvh w-full justify-start')}>
      <div className={cn({ 'w-1/3 sm:w-fit': leftDivState })}>
        <ChannelsNavigationFeature key={'members_navigation' + serverId} />
      </div>
      <SoundManager />
      <div
        className={cn('h-full w-full bg-violet-200 ', {
          'rounded-none md:rounded-r-3xl xl:rounded-none': !rightDivState,
          'rounded-r-2xl sm:rounded-none': rightDivState,
          'w-2/3 sm:w-full ': leftDivState,
        })}
      >
        <Outlet />
      </div>
      <MembersNavigationFeature key={'members_navigation' + serverId} />
    </div>
  )
}
