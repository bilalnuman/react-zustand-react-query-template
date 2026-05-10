import { useTranslations } from 'next-intl'
import React from 'react'

const Page = () => {
  const t = useTranslations("Pages")
  return (
    <div>
      {t("createNewClosing")}
    </div>
  )
}

export default Page
