/* eslint-disable @nx/enforce-module-boundaries */
import { Permissions, ServerEntity } from '@beep/contracts'
import { ServerContext } from '@beep/pages/channels'
import { RolesSettingsServerFeature } from '@beep/pages/role-settings'
import { SettingBodyWidth, SettingsModal, SubSettings } from '@beep/settings'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FullScreenDialog,
  FullScreenDialogContent,
  FullScreenDialogTrigger,
  Icon,
  UseModalProps,
} from '@beep/ui'
import { PropsWithChildren, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import DestroyServerFeature from '../feature/destroy-server-feature'
import { OverviewSettingsServer } from './overview-settings-server'
import { WebHookSettingsServer } from '@beep/layout'
interface ServerDropdownProps {
  server: ServerEntity
  onClickId: (id: string) => void
  openModal: React.Dispatch<React.SetStateAction<UseModalProps | undefined>>
  closeModal: () => void
}

export function ServerDropdown({
  children,
  server,
  openModal,
  closeModal,
}: PropsWithChildren<ServerDropdownProps>) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const navigateAfterDelete = () => navigate('/servers')
  const { myMember } = useContext(ServerContext)
  const subSetting: SubSettings = {
    subGroupSettingTitle: t('layout.server-dropdown.server'),
    settings: [
      {
        title: 'Overview',
        settingComponent: server && <OverviewSettingsServer server={server} />,
        id: 'overview',
        settingBodySize: SettingBodyWidth.L,
      },
      {
        title: 'Webhooks',
        settingComponent: server && <WebHookSettingsServer server={server} />,
        id: 'webhooks',
        settingBodySize: SettingBodyWidth.L,
      },
    ],
  }
  if (myMember?.hasPermission(Permissions.MANAGE_ROLES)) {
    subSetting.settings.push({
      title: t('layout.server-dropdown.roles'),
      settingComponent: server && (
        <RolesSettingsServerFeature server={server} />
      ),
      id: 'roles',
      settingBodySize: SettingBodyWidth.L,
    })
  }
  return (
    <FullScreenDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-lg bg-violet-50 mt-4 mx-5 py-4 px-3">
          <FullScreenDialogTrigger>
            <DropdownMenuItem className="flex flex-row h-full w-full hover:bg-black/10 gap-2 rounded-md cursor-pointer">
              <Icon name="lucide:settings" />
              <div className="flex h-full w-full font-semibold">
                {t('layout.server-dropdown.settings')}
              </div>
            </DropdownMenuItem>
          </FullScreenDialogTrigger>
          {(!myMember ||
            myMember?.hasPermission(Permissions.MANAGE_SERVER)) && (
            <DropdownMenuItem
              className="flex flex-row h-full w-full hover:bg-red-500/10 gap-2 rounded-md cursor-pointer"
              onClick={() => {
                openModal({
                  content: (
                    <DestroyServerFeature
                      serverId={server.id}
                      closeModal={closeModal}
                      navigateAfterDelete={navigateAfterDelete}
                    />
                  ),
                })
              }}
            >
              <Icon name="lucide:trash-2" className="fill-red-600" />
              <div className="flex h-full w-full font-semibold text-red-500">
                {t('layout.server-dropdown.destroy')}
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogHeader hidden>
        <DialogTitle hidden>Settings</DialogTitle>
        <DialogDescription hidden>SettingsPage</DialogDescription>
      </DialogHeader>

      <FullScreenDialogContent className="flex flex-row w-full h-full z-40">
        <SettingsModal settings={[subSetting]} />
      </FullScreenDialogContent>
    </FullScreenDialog>
  )
}
