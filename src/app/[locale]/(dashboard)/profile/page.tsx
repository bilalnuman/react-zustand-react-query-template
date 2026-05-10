import { useTranslations } from 'next-intl'
import React from 'react'

const Page = () => {
  const t = useTranslations("Pages")
  return (
    <div>
      {t("profile")}
    </div>
  )
}

export default Page
