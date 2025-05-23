import { UserDisplayedEntity } from '@beep/contracts'
import { Button, ButtonStyle, Icon } from '@beep/ui'
import { useFetchProfilePictureQuery } from '@beep/user'
import { skipToken } from '@reduxjs/toolkit/query'
import { useTranslation } from 'react-i18next'

export interface UserInformationsFeatureProps {
  user: UserDisplayedEntity
  onClose: () => void
}

export const UserInformationsFeature = ({
  user,
  onClose,
}: UserInformationsFeatureProps) => {
  const { t } = useTranslation()

  const { currentData: userProfilePicture } = useFetchProfilePictureQuery(
    user.id ?? skipToken
  )

  return (
    <div
      className="fixed right-0 left-0 top-0 bottom-0 bg-[#101420]/50 z-50"
      onClick={() => onClose()}
    >
      <div
        className="fixed h-full w-[300px] bg-white right-0 rounded-l-lg p-4 animate-slideIn flex flex-col items-start gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-bold">
            {t('channels.user-information.title')}
          </p>

          <Button style={ButtonStyle.NONE} onClick={() => onClose()}>
            <Icon name="lucide:x" className="w-5 h-5 cursor-pointer" />
          </Button>
        </div>
        <div className="flex justify-between items-center gap-4">
          <img
            className="w-9 min-w-[50px] h-9 min-h-[50px] object-cover bg-violet-50 rounded-xl"
            src={userProfilePicture || '/picture.svg'}
            alt={t('channels.user-information.user_picture_alt', {
              username: user.username,
            })}
          />
          <p className="text-base font-semibold">{user.username}</p>
        </div>
      </div>
    </div>
  )
}
