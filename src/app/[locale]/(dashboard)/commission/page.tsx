import { useTranslations } from 'next-intl'
import React from 'react'

const Page = () => {
  const t = useTranslations("Pages")
  return (
    <div>
      {t("commission")}
    </div>
  )
}

export default Page
